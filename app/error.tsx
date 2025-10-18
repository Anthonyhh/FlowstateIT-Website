'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 text-center">
        <div className="mb-8">
          <h1 className="text-fluid-4xl font-heading font-bold text-gradient-violet mb-4">
            Oops!
          </h1>
          <h2 className="text-fluid-xl text-foreground/80 mb-2">
            Something went wrong
          </h2>
          <p className="text-muted-foreground text-fluid-base">
            We've been notified and are working to fix the issue.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/60 mt-4 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="gradient" size="lg">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="outline" size="lg">
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
