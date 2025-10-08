'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * AIBackground - Flowing particle system with Three.js
 * Creates a cinematic violet/cyan particle field that responds to scroll
 */

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  // Generate particle positions
  const particleCount = 2000
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // Violet and cyan color values in RGB
    const violetColor = new THREE.Color(0x7f00ff) // #7F00FF
    const cyanColor = new THREE.Color(0x00cfff) // #00CFFF

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Position particles in a cube
      positions[i3] = (Math.random() - 0.5) * 20 // x
      positions[i3 + 1] = (Math.random() - 0.5) * 20 // y
      positions[i3 + 2] = (Math.random() - 0.5) * 15 // z

      // Gradient between violet and cyan
      const mixFactor = Math.random()
      const color = violetColor.clone().lerp(cyanColor, mixFactor)

      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  // Animate particles
  useFrame((state) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()

    // Rotate the entire particle field
    ref.current.rotation.x = time * 0.05
    ref.current.rotation.y = time * 0.075

    // Gentle wave motion
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const z = positions[i3 + 2]

      // Create wave effect
      positions[i3 + 1] += Math.sin(time + x * 0.5 + z * 0.5) * 0.002
    }

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={particles.positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function AIBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Responsive pixel ratio
      >
        <ParticleField />
      </Canvas>
    </div>
  )
}
