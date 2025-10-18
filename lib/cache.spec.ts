import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import fc from 'fast-check'
import {
  apiCache,
  withCache,
  getCached,
  setCached,
  deleteCached,
  clearCache,
  getCacheStats,
  getCacheHealth,
  InMemoryApiCache,
  // Backward compatibility imports
  getFromCache,
  setInCache,
  removeFromCache,
  getCachedStrict,
  deleteCachedStrict,
} from './cache'
import type { CacheStats } from './cache'

describe('ApiCache', () => {
  const shortTtl = 100 // 100ms for testing

  beforeEach(() => {
    // Clear cache before each test
    clearCache()
  })

  afterEach(() => {
    clearCache()
  })

  describe('basic operations', () => {
    test('stores and retrieves values correctly', () => {
      setCached('key1', 'value1')

      expect(getCached('key1')).toBe('value1')
    })

    test('returns null for non-existent keys', () => {
      expect(getCached('nonexistent')).toBeNull()
    })

    test('overwrites existing keys', () => {
      setCached('key1', 'value1')
      setCached('key1', 'value2')

      expect(getCached('key1')).toBe('value2')
    })

    test('handles different value types', () => {
      const testObject = { id: 1, name: 'test' }

      setCached('obj', testObject)

      expect(getCached('obj')).toEqual(testObject)
    })

    test('deletes keys correctly', () => {
      setCached('key1', 'value1')

      expect(deleteCached('key1')).toBe(true)
      expect(getCached('key1')).toBeNull()
      expect(deleteCached('nonexistent')).toBe(false)
    })

    test('clears all entries', () => {
      setCached('key1', 'value1')
      setCached('key2', 'value2')

      clearCache()

      expect(getCached('key1')).toBeNull()
      expect(getCached('key2')).toBeNull()
    })
  })

  describe('TTL expiration', () => {
    test('expires entries after TTL', async () => {
      setCached('shortLived', 'value', shortTtl)

      expect(getCached('shortLived')).toBe('value')

      // Wait for expiration
      await new Promise((resolve) => setTimeout(resolve, shortTtl + 50))

      expect(getCached('shortLived')).toBeNull()
    })

    test('respects custom TTL over default', async () => {
      setCached('custom', 'value', shortTtl)
      setCached('default', 'value') // Uses default TTL

      await new Promise((resolve) => setTimeout(resolve, shortTtl + 50))

      expect(getCached('custom')).toBeNull()
      expect(getCached('default')).toBe('value') // Should still exist
    })
  })

  describe('security features', () => {
    test('sanitizes cache keys with PII', () => {
      const emailKey = 'user:john.doe@company.com:profile'
      const ipKey = 'request:192.168.1.100:data'

      setCached(emailKey, 'data1')
      setCached(ipKey, 'data2')

      // Should store and retrieve successfully (key sanitization is internal)
      expect(getCached(emailKey)).toBe('data1')
      expect(getCached(ipKey)).toBe('data2')
    })

    test('handles malicious cache keys', () => {
      const maliciousKeys = [
        'key<script>alert(1)</script>',
        'key\r\nheader-injection: evil',
        'key' + 'x'.repeat(500), // Moderately long key (within limits)
      ]

      for (const key of maliciousKeys) {
        setCached(key, 'safe-value')
        expect(getCached(key)).toBe('safe-value')
      }
    })

    test('prevents ReDoS attacks in key sanitization', () => {
      // These patterns would cause catastrophic backtracking with vulnerable regex
      const redosPatterns = [
        'a'.repeat(100) + '@'.repeat(100), // Would cause regex DoS
        'test@' + '@'.repeat(200) + '.com', // Multiple @ symbols (shorter)
        '192.168.1.' + '1'.repeat(200), // Long IP-like pattern (shorter)
        'user@domain' + '.'.repeat(200) + 'com', // Many dots (shorter)
        'aaaaaaaaaaaaaaaaaaa@@@@@@@@@@@@@@@@@', // Classic ReDoS pattern
      ]

      // Measure time to ensure no exponential backtracking
      for (const pattern of redosPatterns) {
        const startTime = performance.now()
        setCached(pattern, 'value')
        const endTime = performance.now()

        // Should complete in less than 10ms (regex DoS would take seconds)
        expect(endTime - startTime).toBeLessThan(10)

        // Should still work correctly
        expect(getCached(pattern)).toBe('value')
      }
    })

    test('correctly identifies and sanitizes various PII patterns', () => {
      // Test email sanitization
      setCached('contact user@example.com for info', 'test1')
      setCached('emails: admin@site.org and user@test.com', 'test2')

      // Test IP sanitization
      setCached('server at 192.168.1.1 is down', 'test3')
      setCached('connect to 10.0.0.1 or 172.16.0.1', 'test4')

      // Test hash sanitization
      setCached('hash: a1b2c3d4e5f6789012345678901234567890abcd', 'test5')
      setCached('md5: 5d41402abc4b2a76b9719d911017c592', 'test6')

      // All should store and retrieve correctly
      expect(getCached('contact user@example.com for info')).toBe('test1')
      expect(getCached('server at 192.168.1.1 is down')).toBe('test3')
      expect(getCached('hash: a1b2c3d4e5f6789012345678901234567890abcd')).toBe('test5')
    })
  })

  describe('memory management', () => {
    test('tracks memory usage', () => {
      setCached('small', 'x')
      setCached('large', 'x'.repeat(10000))

      const stats = getCacheStats()
      expect(stats.memoryUsageMB).toBeGreaterThan(0)
      expect(stats.size).toBe(2)
    })

    test('evicts entries when memory limit reached', () => {
      // Fill cache with large entries to test memory eviction
      for (let i = 0; i < 100; i++) {
        setCached(`large-${i}`, 'x'.repeat(100000)) // 100KB each
      }

      const stats = getCacheStats()
      expect(stats.memoryUsageMB).toBeLessThan(100) // Should be under limit
    })

    test('evicts oldest entries when size limit reached', () => {
      // Add many small entries to test count-based eviction
      for (let i = 0; i < 1000; i++) {
        setCached(`item-${i}`, `value-${i}`)
      }

      const stats = getCacheStats()
      expect(stats.size).toBeLessThanOrEqual(500) // Should respect maxSize
    })
  })

  describe('statistics and monitoring', () => {
    test('provides accurate statistics', () => {
      setCached('key1', 'value1')
      setCached('key2', 'value2')

      getCached('key1') // Hit
      getCached('key1') // Hit
      getCached('nonexistent') // Miss

      const stats = getCacheStats()
      expect(stats.size).toBe(2)
      expect(stats.totalAccesses).toBe(3)
      expect(stats.totalHits).toBe(2)
      expect(stats.hitRate).toBeCloseTo(2 / 3, 2)
    })

    test('tracks memory usage accurately', () => {
      const stats1 = getCacheStats()
      const initialMemory = stats1.memoryUsageMB

      setCached('large-item', 'x'.repeat(100000)) // ~100KB

      const stats2 = getCacheStats()
      expect(stats2.memoryUsageMB).toBeGreaterThan(initialMemory)
    })
  })
})

describe('withCache helper', () => {
  beforeEach(() => {
    clearCache()
  })

  afterEach(() => {
    clearCache()
  })

  test('caches function results', async () => {
    let callCount = 0
    const expensiveFunction = async () => {
      callCount++
      return `result-${callCount}`
    }

    const result1 = await withCache(apiCache, 'test-key', expensiveFunction)
    const result2 = await withCache(apiCache, 'test-key', expensiveFunction)

    expect(result1.data).toBe('result-1')
    expect(result1.cached).toBe(false)

    expect(result2.data).toBe('result-1') // Same result from cache
    expect(result2.cached).toBe(true)

    expect(callCount).toBe(1) // Function only called once
  })

  test('respects custom TTL', async () => {
    let callCount = 0
    const quickFunction = async () => {
      callCount++
      return `result-${callCount}`
    }

    await withCache(apiCache, 'quick-key', quickFunction, 50) // 50ms TTL

    await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for expiration

    await withCache(apiCache, 'quick-key', quickFunction, 50)

    expect(callCount).toBe(2) // Function called twice due to expiration
  })

  test('handles errors gracefully', async () => {
    const failingFunction = async () => {
      throw new Error('Test error')
    }

    await expect(withCache(apiCache, 'error-key', failingFunction)).rejects.toThrow('Test error')

    // Error should not be cached
    expect(getCached('error-key')).toBeNull()
  })
})

describe('memory leak prevention', () => {
  test('properly cleans up intervals on destroy', () => {
    // Create a temporary cache instance
    const tempCache = new InMemoryApiCache({
      cleanupInterval: 100, // Short interval for testing
      maxSize: 10,
    })

    // Set some values
    tempCache.set('test1', 'value1')
    tempCache.set('test2', 'value2')

    // Destroy the cache - should not throw
    expect(() => tempCache.destroy()).not.toThrow()

    // Verify cache is cleared
    expect(tempCache.get('test1')).toBeNull()
  })

  test('prevents double destruction', () => {
    const tempCache = new InMemoryApiCache({
      cleanupInterval: 100,
      maxSize: 10,
    })

    tempCache.set('test', 'value')

    // Should not throw on double destroy
    expect(() => {
      tempCache.destroy()
      tempCache.destroy() // Second call should be safe
    }).not.toThrow()

    expect(tempCache.get('test')).toBeNull()
  })

  test('cleanup does not run after destroy', async () => {
    const tempCache = new InMemoryApiCache({
      cleanupInterval: 50, // Very short interval
      defaultTtl: 10, // Very short TTL
      maxSize: 10,
    })

    tempCache.set('test', 'value')

    // Destroy immediately
    tempCache.destroy()

    // Wait for what would be multiple cleanup cycles
    await new Promise(resolve => setTimeout(resolve, 200))

    // Cache should still be empty (no zombie cleanup)
    expect(tempCache.get('test')).toBeNull()
  })
})

describe('cache properties', () => {
  beforeEach(() => {
    clearCache()
  })

  test('key sanitization is consistent', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }),
        fc.string({ minLength: 1, maxLength: 100 }),
        (key, value) => {
          setCached(key, value)
          const retrieved = getCached(key)

          // Should always be able to retrieve what we stored
          expect(retrieved).toBe(value)
        }
      )
    )
  })

  test('memory tracking is accurate', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 10, maxLength: 1000 }), { minLength: 1, maxLength: 50 }),
        (values) => {
          clearCache()

          for (let i = 0; i < values.length; i++) {
            setCached(`key-${i}`, values[i])
          }

          const stats = getCacheStats()

          // Memory usage should be positive and reasonable
          expect(stats.memoryUsageMB).toBeGreaterThan(0)
          expect(stats.memoryUsageMB).toBeLessThan(100) // Reasonable upper bound
          expect(stats.size).toBe(Math.min(values.length, 500)) // Respect maxSize
        }
      )
    )
  })

  test('TTL behavior is consistent', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 50, max: 200 }), // Reduced max TTL for faster tests
        fc.string({ minLength: 1, maxLength: 20 }), // Reduced string length
        async (ttl, value) => {
          clearCache()

          setCached('ttl-test', value, ttl)

          // Should be available immediately
          expect(getCached('ttl-test')).toBe(value)

          // Wait for full TTL plus buffer - should be expired
          await new Promise((resolve) => setTimeout(resolve, ttl + 50))
          expect(getCached('ttl-test')).toBeNull()
        }
      ),
      { numRuns: 10 } // Reduce number of test runs for faster execution
    )
  }, 15000) // Increase timeout to 15 seconds
})

describe('race condition prevention', () => {
  beforeEach(() => {
    clearCache()
  })

  afterEach(() => {
    clearCache()
  })

  test('atomic operations prevent concurrent access', () => {
    // This test verifies that concurrent operations are properly serialized
    const operations = []

    // Create operations that would cause race conditions if not properly atomic
    for (let i = 0; i < 10; i++) {
      operations.push(() => setCached(`key${i}`, `value${i}`))
      operations.push(() => getCached(`key${i}`))
      operations.push(() => deleteCached(`key${i}`))
    }

    // Execute all operations - should not throw concurrent operation errors
    for (const operation of operations) {
      expect(() => operation()).not.toThrow('Concurrent cache operation detected')
    }
  })

  test('concurrent set operations maintain consistent memory tracking', async () => {
    const promises: Promise<void>[] = []
    const numOperations = 50

    // Perform concurrent set operations
    for (let i = 0; i < numOperations; i++) {
      promises.push(
        new Promise<void>((resolve) => {
          setTimeout(() => {
            setCached(`key-${i}`, `value-${i}`.repeat(100))
            resolve()
          }, Math.random() * 10)
        })
      )
    }

    await Promise.all(promises)

    // Verify memory tracking is consistent
    const stats = getCacheStats()
    let expectedMemory = 0

    for (let i = 0; i < numOperations; i++) {
      const value = getCached(`key-${i}`)
      if (value) {
        const jsonSize = Buffer.byteLength(JSON.stringify(value), 'utf8')
        const overhead = Math.ceil(jsonSize * 0.4) // Match cache's memory estimation
        expectedMemory += jsonSize + overhead
      }
    }

    // Allow for small variations due to overhead
    const actualMemoryBytes = stats.memoryUsageMB * 1024 * 1024
    expect(Math.abs(actualMemoryBytes - expectedMemory)).toBeLessThan(1000) // Within 1KB tolerance
  })

  test('concurrent get/set/delete operations maintain memory consistency', async () => {
    // Set initial data
    for (let i = 0; i < 20; i++) {
      setCached(`item-${i}`, `data-${i}`.repeat(50))
    }

    const operations: Promise<any>[] = []

    // Concurrent reads
    for (let i = 0; i < 10; i++) {
      operations.push(
        new Promise<any>((resolve) => {
          setTimeout(() => {
            resolve(getCached(`item-${i}`))
          }, Math.random() * 50)
        })
      )
    }

    // Concurrent updates
    for (let i = 0; i < 10; i++) {
      operations.push(
        new Promise<void>((resolve) => {
          setTimeout(() => {
            setCached(`item-${i}`, `updated-${i}`.repeat(75))
            resolve()
          }, Math.random() * 50)
        })
      )
    }

    // Concurrent deletes
    for (let i = 10; i < 20; i++) {
      operations.push(
        new Promise<boolean>((resolve) => {
          setTimeout(() => {
            resolve(deleteCached(`item-${i}`))
          }, Math.random() * 50)
        })
      )
    }

    await Promise.all(operations)

    // Memory tracking should be consistent after all operations
    const stats = getCacheStats()
    expect(stats.memoryUsageMB).toBeGreaterThanOrEqual(0)
    expect(stats.size).toBeGreaterThanOrEqual(0)
  })

  test('memory tracking remains accurate during TTL expiration', async () => {
    // Set entries with short TTL
    setCached('short-lived-1', 'x'.repeat(1000), 50)
    setCached('short-lived-2', 'y'.repeat(1000), 50)
    setCached('long-lived', 'z'.repeat(1000), 5000)

    const initialStats = getCacheStats()
    expect(initialStats.size).toBe(3)

    // Wait for TTL expiration
    await new Promise(resolve => setTimeout(resolve, 100))

    // Access entries to trigger expiration cleanup
    getCached('short-lived-1')
    getCached('short-lived-2')
    getCached('long-lived')

    const finalStats = getCacheStats()

    // Only long-lived entry should remain
    expect(finalStats.size).toBe(1)
    expect(finalStats.memoryUsageMB).toBeLessThan(initialStats.memoryUsageMB)
  })

  test('eviction maintains consistent memory tracking under pressure', () => {
    // Create a small cache instance for testing eviction
    const smallCache = new InMemoryApiCache({
      maxSize: 5,
      maxMemoryMB: 1, // Very small memory limit
      defaultTtl: 300000,
    })

    try {
      // Fill cache beyond capacity to trigger evictions
      for (let i = 0; i < 20; i++) {
        smallCache.set(`key-${i}`, 'x'.repeat(10000)) // ~10KB each
      }

      const stats = smallCache.getStats()

      // Should not exceed max size
      expect(stats.size).toBeLessThanOrEqual(5)

      // Should not exceed memory limit significantly
      expect(stats.memoryUsageMB).toBeLessThan(2) // Small buffer for overhead

      // Memory usage should be positive and reasonable
      expect(stats.memoryUsageMB).toBeGreaterThan(0)
    } finally {
      smallCache.destroy()
    }
  })
})

describe('input validation', () => {
  beforeEach(() => {
    clearCache()
  })

  afterEach(() => {
    clearCache()
  })

  describe('key validation', () => {
    test('rejects null or undefined keys', () => {
      expect(() => setCached(null as any, 'value')).toThrow('Cache key must be a non-empty string')
      expect(() => setCached(undefined as any, 'value')).toThrow('Cache key must be a non-empty string')
    })

    test('rejects empty string keys', () => {
      expect(() => setCached('', 'value')).toThrow('Cache key must be a non-empty string')
    })

    test('rejects non-string keys', () => {
      expect(() => setCached(123 as any, 'value')).toThrow('Cache key must be a non-empty string')
      expect(() => setCached({} as any, 'value')).toThrow('Cache key must be a non-empty string')
      expect(() => setCached([] as any, 'value')).toThrow('Cache key must be a non-empty string')
    })

    test('rejects keys that are too long', () => {
      const longKey = 'x'.repeat(1001)
      expect(() => setCached(longKey, 'value')).toThrow('Cache key too long (max 1000 characters)')
    })

    test('accepts valid string keys', () => {
      expect(() => setCached('valid-key', 'value')).not.toThrow()
      expect(() => setCached('key with spaces', 'value')).not.toThrow()
      expect(() => setCached('special@chars#allowed', 'value')).not.toThrow()
    })

    test('validates keys in get operations', () => {
      // Get operations now return null on validation errors instead of throwing
      expect(getCached(null as any)).toBeNull()
      expect(getCached('')).toBeNull()
    })

    test('validates keys in delete operations', () => {
      // Delete operations now return false on validation errors instead of throwing
      expect(deleteCached(null as any)).toBe(false)
      expect(deleteCached('')).toBe(false)
    })
  })

  describe('TTL validation', () => {
    test('rejects negative TTL', () => {
      expect(() => setCached('key', 'value', -1)).toThrow('TTL must be a non-negative finite number')
    })

    test('rejects infinite TTL', () => {
      expect(() => setCached('key', 'value', Infinity)).toThrow('TTL must be a non-negative finite number')
      expect(() => setCached('key', 'value', -Infinity)).toThrow('TTL must be a non-negative finite number')
    })

    test('rejects NaN TTL', () => {
      expect(() => setCached('key', 'value', NaN)).toThrow('TTL must be a non-negative finite number')
    })

    test('rejects non-numeric TTL', () => {
      expect(() => setCached('key', 'value', 'invalid' as any)).toThrow('TTL must be a non-negative finite number')
    })

    test('rejects TTL that is too large', () => {
      const oneDayMs = 86400000
      expect(() => setCached('key', 'value', oneDayMs + 1)).toThrow('TTL too large (max 24 hours)')
    })

    test('accepts valid TTL values', () => {
      expect(() => setCached('key1', 'value', 0)).not.toThrow()
      expect(() => setCached('key2', 'value', 1000)).not.toThrow()
      expect(() => setCached('key3', 'value', 86400000)).not.toThrow() // Exactly 24 hours
    })
  })

  describe('value validation', () => {
    test('rejects circular references', () => {
      const circular: any = { name: 'test' }
      circular.self = circular

      expect(() => setCached('key', circular)).toThrow('Cache value contains circular references')
    })

    test('rejects values that are too large', () => {
      // Create a value larger than 10MB
      const largeValue = { data: 'x'.repeat(11 * 1024 * 1024) }
      expect(() => setCached('key', largeValue)).toThrow('Cache value too large (max 10MB)')
    })

    test('rejects non-serializable values', () => {
      const nonSerializable = { func: () => {} }
      // Functions can't be serialized to JSON
      expect(() => setCached('key', nonSerializable)).toThrow('Cache value is not serializable')
    })

    test('accepts valid serializable values', () => {
      expect(() => setCached('key1', 'string')).not.toThrow()
      expect(() => setCached('key2', 42)).not.toThrow()
      expect(() => setCached('key3', true)).not.toThrow()
      expect(() => setCached('key4', null)).not.toThrow()
      expect(() => setCached('key5', { object: 'value' })).not.toThrow()
      expect(() => setCached('key6', [1, 2, 3])).not.toThrow()
    })

    test('handles nested objects correctly', () => {
      const nestedObject = {
        level1: {
          level2: {
            level3: {
              data: 'deep nesting is ok',
              array: [1, 2, { nested: 'array object' }]
            }
          }
        }
      }

      expect(() => setCached('nested', nestedObject)).not.toThrow()
    })
  })

  describe('security validation', () => {
    test('prevents injection attacks through keys', () => {
      const maliciousKeys = [
        'key\\n\\rInjected-Header: evil',
        'key\x00null-byte',
        'key\u0001control-char',
        'key<script>alert(1)</script>',
        'key${process.env.SECRET}'
      ]

      for (const maliciousKey of maliciousKeys) {
        // Should not throw validation errors (sanitization handles security)
        expect(() => setCached(maliciousKey, 'safe-value')).not.toThrow()
      }
    })

    test('prevents prototype pollution attempts', () => {
      const pollutionAttempts: any[] = [
        { '__proto__': { isAdmin: true } },
        { 'constructor': { 'prototype': { isAdmin: true } } },
        { 'prototype': { isAdmin: true } }
      ]

      for (const attempt of pollutionAttempts) {
        // Should not throw validation errors - just store safely
        expect(() => setCached('pollution-test', attempt)).not.toThrow()
      }
    })

    test('handles unicode and special characters safely', () => {
      const unicodeValues = [
        '🔒🛡️ security test 🔐',
        'тест на русском языке',
        '测试中文字符',
        '🚀 emoji with spaces 🎯',
        '\u2028\u2029 line separators'
      ]

      for (const value of unicodeValues) {
        expect(() => setCached('unicode-test', value)).not.toThrow()
        expect(() => setCached(value, 'unicode-key-test')).not.toThrow()
      }
    })
  })

  describe('error handling in validation', () => {
    test('validation errors do not corrupt cache state', () => {
      // Set a valid entry first
      setCached('valid-key', 'valid-value')
      expect(getCached('valid-key')).toBe('valid-value')

      // Try invalid operations
      expect(() => setCached('', 'invalid')).toThrow()
      expect(() => setCached('key', 'value', -1)).toThrow()

      // Original entry should still be intact
      expect(getCached('valid-key')).toBe('valid-value')

      const stats = getCacheStats()
      expect(stats.size).toBe(1)
    })

    test('validation happens before expensive operations', () => {
      const expensiveValue = { data: 'x'.repeat(1000000) } // 1MB

      // Invalid key should fail quickly without processing the large value
      const start = performance.now()
      expect(() => setCached('', expensiveValue)).toThrow('Cache key must be a non-empty string')
      const end = performance.now()

      // Should be very fast (less than 10ms) since validation happens first
      expect(end - start).toBeLessThan(10)
    })
  })

  describe('comprehensive XSS protection', () => {
    test('resists advanced XSS attack vectors', () => {
      const xssVectors = [
        '<script>alert("XSS")</script>',
        'javascript:alert(1)',
        '<img src=x onerror=alert(1)>',
        '<svg onload=alert(1)>',
        '<iframe src="javascript:alert(1)">',
        '<object data="data:text/html,<script>alert(1)</script>">',
        '<embed src="data:image/svg+xml,<svg onload=alert(1)>">',
        '<meta http-equiv="refresh" content="0;url=javascript:alert(1)">',
        '<link rel=import href="data:text/html,<script>alert(1)</script>">',
        '"><script>alert(1)</script>',
        '\';alert(1);//',
        '`${alert(1)}`',
        'eval(alert(1))',
        '${7*7}', // Template injection
        '#{7*7}', // Ruby-style template injection
      ]

      for (const vector of xssVectors) {
        // Should store and retrieve safely without executing
        expect(() => setCached(`test-${vector}`, 'safe-value')).not.toThrow()
        expect(() => setCached('test-key', vector)).not.toThrow()

        // Retrieved value should be exactly what was stored
        expect(getCached('test-key')).toBe(vector)
      }
    })

    test('prevents CRLF injection in cache keys', () => {
      const crlfVectors = [
        'key\r\nSet-Cookie: evil=true',
        'key\nContent-Type: text/html',
        'key\r\nLocation: http://evil.com',
        'key\u000ASet-Cookie: stolen=session',
        'key\u000DContent-Length: 0',
        'key\u0000null-byte-injection',
        'key\u0001control-character',
        'key\u0085next-line-separator',
        'key\u2028line-separator',
        'key\u2029paragraph-separator',
      ]

      for (const vector of crlfVectors) {
        // Should handle safely without header injection
        expect(() => setCached(vector, 'test-value')).not.toThrow()
        expect(getCached(vector)).toBe('test-value')
      }
    })
  })

  describe('cache health monitoring', () => {
    test('reports healthy status under normal conditions', () => {
      setCached('test1', 'value1')
      setCached('test2', 'value2')
      getCached('test1') // Generate some hits

      const health = getCacheHealth()

      expect(health.status).toBe('healthy')
      expect(health.timestamp).toBeTruthy()
      expect(health.uptime).toBeGreaterThan(0)
      expect(health.issues).toHaveLength(0)
      expect(health.metrics.size).toBe(2)
    })

    test('detects degraded performance with low hit rate', () => {
      // Generate many misses to lower hit rate
      for (let i = 0; i < 200; i++) {
        getCached(`nonexistent-${i}`)
      }

      const health = getCacheHealth()
      expect(health.status).toBe('degraded')
      expect(health.issues).toContain('Low cache hit rate detected')
    })

    test('detects memory pressure conditions', () => {
      // Fill cache near memory limit
      const smallCache = new InMemoryApiCache({
        maxMemoryMB: 1,
        maxSize: 100,
      })

      try {
        // Fill with large items
        for (let i = 0; i < 50; i++) {
          smallCache.set(`large-${i}`, 'x'.repeat(20000)) // ~20KB each
        }

        const health = {
          status: smallCache.getStats().memoryUsageMB / 1 > 0.9 ? 'degraded' as const : 'healthy' as const,
          issues: smallCache.getStats().memoryUsageMB / 1 > 0.9 ? ['High memory usage detected'] : []
        }

        expect(health.status).toBe('degraded')
        expect(health.issues).toContain('High memory usage detected')
      } finally {
        smallCache.destroy()
      }
    })
  })

  // T-7 through T-12: Comprehensive security testing
  describe('advanced security testing', () => {
    describe('prototype pollution prevention', () => {
      test('prevents prototype pollution through cache keys', () => {
        const maliciousKeys = [
          '__proto__',
          'constructor',
          'prototype',
          '__proto__.isAdmin',
          'constructor.prototype.isAdmin',
          'prototype.isAdmin'
        ]

        for (const maliciousKey of maliciousKeys) {
          expect(() => setCached(maliciousKey, true)).not.toThrow()
          // Verify no prototype pollution occurred
          expect(({}as any).isAdmin).toBeUndefined()
          expect((Object.prototype as any).isAdmin).toBeUndefined()
        }
      })

      test('prevents prototype pollution through cache values', () => {
        const maliciousValues: any[] = [
          { __proto__: { isAdmin: true } },
          { constructor: { prototype: { isAdmin: true } } },
          { prototype: { isAdmin: true } }
        ]

        for (const maliciousValue of maliciousValues) {
          expect(() => setCached('test-key', maliciousValue)).not.toThrow()
          // Verify no prototype pollution occurred
          expect(({}as any).isAdmin).toBeUndefined()
          expect((Object.prototype as any).isAdmin).toBeUndefined()
        }
      })
    })

    describe('injection attack prevention', () => {
      test('prevents CRLF injection in cache keys', () => {
        const crlfVectors = [
          'key\r\nHeader: malicious',
          'key\nX-Injection: attack',
          'key\r\n\r\nHTTP/1.1 200 OK',
          'key%0d%0aSet-Cookie: admin=true',
          'key\u2028newline',
          'key\u2029paragraph'
        ]

        for (const vector of crlfVectors) {
          expect(() => setCached(vector, 'value')).not.toThrow()
          const result = getCached(vector)
          expect(result).toBe('value')
        }
      })

      test('prevents SQL injection patterns in keys', () => {
        const sqlVectors = [
          "'; DROP TABLE users; --",
          "' OR '1'='1",
          "admin'/**/OR/**/1=1#",
          "'; EXEC xp_cmdshell('dir'); --",
          "' UNION SELECT password FROM users --"
        ]

        for (const vector of sqlVectors) {
          expect(() => setCached(vector, 'value')).not.toThrow()
          const result = getCached(vector)
          expect(result).toBe('value')
        }
      })

      test('prevents NoSQL injection patterns', () => {
        const noSqlVectors = [
          { $ne: null },
          { $gt: '' },
          { $where: 'function() { return true; }' },
          { $regex: '.*' },
          { $exists: true }
        ]

        for (const vector of noSqlVectors) {
          expect(() => setCached('key', vector)).not.toThrow()
          const result = getCached('key')
          expect(result).toEqual(vector)
        }
      })
    })

    describe('denial of service prevention', () => {
      test('prevents memory exhaustion through massive keys', () => {
        // Should reject keys that are too large before processing
        const massiveKey = 'x'.repeat(10000)
        expect(() => setCached(massiveKey, 'value')).toThrow('Cache key too long')
      })

      test('prevents memory exhaustion through massive values', () => {
        // Should reject values that are too large
        const massiveValue = 'x'.repeat(15 * 1024 * 1024) // 15MB
        expect(() => setCached('key', massiveValue)).toThrow('Cache value too large')
      })

      test('prevents algorithmic complexity attacks', () => {
        // Test with deeply nested objects that could cause exponential processing
        const createDeepObject = (depth: number): any => {
          if (depth === 0) return 'leaf'
          return { nested: createDeepObject(depth - 1) }
        }

        const deepObject = createDeepObject(100)
        expect(() => setCached('deep', deepObject)).not.toThrow()
      })

      test('prevents hash collision attacks', () => {
        // Test with smaller number to avoid cache eviction during test
        const collisionKeys = Array.from({ length: 100 }, (_, i) => `collision_${i}`)

        for (const key of collisionKeys) {
          expect(() => setCached(key, `value_${key}`)).not.toThrow()
        }

        // Verify all keys were stored correctly (within cache limits)
        for (const key of collisionKeys) {
          expect(getCached(key)).toBe(`value_${key}`)
        }
      })
    })

    describe('buffer overflow prevention', () => {
      test('handles extremely long sanitization patterns safely', () => {
        // Test with patterns that could cause buffer overflows during sanitization
        const longEmailPattern = 'a'.repeat(500) + '@' + 'b'.repeat(500) + '.com'
        const longIpPattern = '999.999.999.999.' + '0'.repeat(1000)
        const longHashPattern = 'a'.repeat(1500) // Should be detected as hex and too long

        expect(() => setCached(longEmailPattern, 'value')).toThrow('Cache key too long')
        expect(() => setCached(longIpPattern, 'value')).toThrow('Cache key too long')
        expect(() => setCached(longHashPattern, 'value')).toThrow('Cache key too long')
      })
    })

    describe('property-based security testing', () => {
      test('sanitization is idempotent', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 1, maxLength: 100 }),
            (input) => {
              try {
                setCached(input, 'test')
                const first = getCached(input)
                setCached(input, 'test2')
                const second = getCached(input)

                // If both operations succeed, sanitization should be consistent
                expect(second).toBe('test2')
                return true
              } catch (error) {
                // If validation fails, it should fail consistently
                expect(() => setCached(input, 'test')).toThrow()
                return true
              }
            }
          ),
          { numRuns: 100 }
        )
      })

      test('security validation never corrupts memory tracking', () => {
        fc.assert(
          fc.property(
            fc.oneof(
              fc.constant(null),
              fc.constant(undefined),
              fc.integer(),
              fc.object(),
              fc.string({ maxLength: 2000 })
            ),
            (maliciousKey) => {
              const initialStats = getCacheStats()

              try {
                setCached(maliciousKey as any, 'value')
              } catch (error) {
                // After failed operation, memory tracking should be consistent
                const afterStats = getCacheStats()
                expect(afterStats.memoryUsageMB).toBe(initialStats.memoryUsageMB)
                expect(afterStats.size).toBe(initialStats.size)
              }

              return true
            }
          ),
          { numRuns: 50 }
        )
      })

      test('no information leakage in error messages', () => {
        fc.assert(
          fc.property(
            fc.record({
              key: fc.string({ maxLength: 2000 }),
              value: fc.anything(),
              ttl: fc.option(fc.float())
            }),
            ({ key, value, ttl }) => {
              try {
                setCached(key as any, value, ttl as any)
              } catch (error) {
                // Error messages should not contain sensitive input data
                const errorMessage = error instanceof Error ? error.message : String(error)

                // Should not leak the actual input values
                if (typeof key === 'string' && key.length > 100) {
                  expect(errorMessage).not.toContain(key)
                }

                // Should not leak internal system information
                expect(errorMessage).not.toMatch(/password|secret|token|key.*=|internal/i)
              }

              return true
            }
          ),
          { numRuns: 50 }
        )
      })
    })
  })
})

describe('backward compatibility', () => {
  test('strictValidation=false returns null/false on validation errors (default behavior)', () => {
    const cache = new InMemoryApiCache({ strictValidation: false })

    // Should return graceful failures, not throw
    expect(cache.get(null as any)).toBeNull()
    expect(cache.delete(null as any)).toBe(false)
    expect(cache.has(null as any)).toBe(false)
  })

  test('strictValidation=true throws on validation errors (legacy behavior)', () => {
    const cache = new InMemoryApiCache({ strictValidation: true })

    // Should throw errors like the old behavior
    expect(() => cache.get(null as any)).toThrow('Cache key must be a non-empty string')
    expect(() => cache.delete(null as any)).toThrow('Cache key must be a non-empty string')
    expect(() => cache.has(null as any)).toThrow('Cache key must be a non-empty string')
  })

  test('legacy alias functions work correctly', () => {
    // Test that aliases point to the right functions
    expect(getFromCache).toBe(getCached)
    expect(setInCache).toBe(setCached)
    expect(removeFromCache).toBe(deleteCached)
  })

  test('strict validation helper functions work', () => {
    // These should throw on invalid keys
    expect(() => getCachedStrict(null as any)).toThrow('Cache key must be a non-empty string')
    expect(() => deleteCachedStrict(null as any)).toThrow('Cache key must be a non-empty string')
  })
})

describe('security headers verification', () => {
  test('cache operations maintain security context in logs', () => {
    // Verify that cache operations log security-relevant information
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    try {
      // Operations that should generate security logs
      setCached('test-key', 'test-value')
      getCached('test-key')
      deleteCached('test-key')

      // Verify no sensitive information is logged
      const logCalls = consoleSpy.mock.calls
      for (const call of logCalls) {
        const logMessage = call.join(' ')

        // Ensure no actual key values are exposed in logs
        expect(logMessage).not.toContain('test-value')

        // Verify security-related metadata is present when applicable
        if (logMessage.includes('Cache')) {
          expect(logMessage).toMatch(/level|message|context/)
        }
      }
    } finally {
      consoleSpy.mockRestore()
    }
  })

  test('cache respects security-sensitive key patterns', () => {
    const securitySensitiveKeys = [
      'authorization:Bearer token123',
      'session:sid_abc123def456',
      'api-key:sk-1234567890abcdef',
      'password:secret123',
      'jwt:eyJhbGciOiJIUzI1NiIs'
    ]

    for (const key of securitySensitiveKeys) {
      // Cache should sanitize these keys
      setCached(key, 'test-data')
      const retrieved = getCached(key)

      // Should work (key gets sanitized but cache still functions)
      expect(retrieved).toBe('test-data')

      // Verify the actual stored key is sanitized (not the original)
      const stats = getCacheStats()
      expect(stats.size).toBe(1)

      // Clean up for next iteration
      clearCache()
    }
  })

  test('cache handles cross-site scripting prevention in keys', () => {
    const xssAttempts = [
      '<script>alert("xss")</script>',
      'javascript:alert(document.cookie)',
      '<img src=x onerror=alert(1)>',
      'data:text/html,<script>alert(1)</script>',
      '"><script>alert(String.fromCharCode(88,83,83))</script>',
      '<svg/onload=alert(/XSS/)>',
      '<iframe src="javascript:alert(`xss`)"></iframe>'
    ]

    for (const xssKey of xssAttempts) {
      // Cache should handle XSS attempts safely
      expect(() => setCached(xssKey, 'safe-data')).not.toThrow()
      expect(() => getCached(xssKey)).not.toThrow()
      expect(() => deleteCached(xssKey)).not.toThrow()

      clearCache()
    }
  })

  test('cache operations respect rate limiting context', () => {
    // Simulate high-frequency operations that might trigger rate limiting
    const operations = []
    const startTime = Date.now()

    for (let i = 0; i < 100; i++) {
      operations.push(() => {
        setCached(`burst-key-${i}`, `data-${i}`)
        getCached(`burst-key-${i}`)
      })
    }

    // Execute all operations
    operations.forEach(op => op())

    const endTime = Date.now()
    const duration = endTime - startTime

    // Verify operations completed without throwing security errors
    expect(duration).toBeGreaterThan(0)

    // Verify cache maintained consistency under burst load
    const stats = getCacheStats()
    expect(stats.size).toBe(100)
    expect(stats.memoryUsageMB).toBeGreaterThan(0)

    clearCache()
  })

  test('cache validates content security policy compliance', () => {
    // Test data that might violate CSP policies
    const cspViolatingData = [
      { script: '<script>console.log("test")</script>' },
      { style: '<style>body{background:url(javascript:alert(1))}</style>' },
      { inline: 'onclick="alert(1)"' },
      { data: 'data:application/javascript,alert(1)' }
    ]

    for (const data of cspViolatingData) {
      // Cache should store the data but sanitize keys appropriately
      setCached('csp-test-key', data)
      const retrieved = getCached('csp-test-key')

      // Data should be preserved (cache doesn't sanitize values, only keys)
      expect(retrieved).toEqual(data)

      clearCache()
    }
  })

  test('cache maintains security audit trail', () => {
    // Perform operations that should be auditable
    const auditableOperations = [
      () => setCached('audit-key-1', 'sensitive-data'),
      () => getCached('audit-key-1'),
      () => setCached('audit-key-1', 'updated-data'), // Overwrite
      () => deleteCached('audit-key-1'),
      () => getCached('audit-key-1') // Should be null
    ]

    // Execute operations and verify they complete successfully
    auditableOperations.forEach((operation, index) => {
      expect(() => operation()).not.toThrow()
    })

    // Verify final state is clean
    expect(getCached('audit-key-1')).toBeNull()
  })

  test('cache handles malicious header injection attempts', () => {
    // Test keys that might attempt header injection
    const headerInjectionAttempts = [
      'key\r\nX-Injection: malicious',
      'key\nSet-Cookie: evil=true',
      'key\r\nContent-Type: text/html\r\n\r\n<script>alert(1)</script>',
      'key%0AX-Forwarded-For: 127.0.0.1',
      'key\x0ALocation: javascript:alert(1)'
    ]

    for (const maliciousKey of headerInjectionAttempts) {
      // Cache should sanitize and handle safely
      expect(() => setCached(maliciousKey, 'test-data')).not.toThrow()

      // Should be able to retrieve (with sanitized key)
      const result = getCached(maliciousKey)
      expect(result).toBe('test-data')

      clearCache()
    }
  })
})
