'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorPink;
uniform vec3 uColorCore;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec3 baseColor = vec3(0.01, 0.02, 0.05);

  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(-vViewPosition);

  // Main key light
  vec3 mainLightDir = normalize(vec3(1.5, 2.0, 1.0));
  float mainDiff = max(dot(normal, mainLightDir), 0.0);

  // Specular
  vec3 reflectDir = reflect(-mainLightDir, normal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 128.0);

  // Bright pink wireframe lines via UV
  float wire1 = abs(fract(vUv.x * 40.0) - 0.5);
  wire1 = 1.0 - smoothstep(0.0, 0.04, wire1);
  float wire2 = abs(fract(vUv.y * 80.0) - 0.5);
  wire2 = 1.0 - smoothstep(0.0, 0.02, wire2);
  float wireLines = max(wire1, wire2);

  // Pulse on pink lines
  float pulse = sin(vUv.x * 30.0 + uTime * 4.0) * 0.5 + 0.5;
  pulse = smoothstep(0.7, 1.0, pulse) * 0.4;

  // Dark blue core — inner glow from normal
  float rim = 1.0 - max(dot(viewDir, normal), 0.0);
  float coreRing = pow(rim, 2.5) * 0.5;

  // Compose
  vec3 diffuse = baseColor * (mainDiff * 0.15 + 0.05);
  vec3 wireColor = uColorPink * (wireLines * 1.8 + pulse);
  vec3 specHighlight = vec3(1.0, 0.9, 1.0) * spec * 1.5;
  vec3 coreGlow = uColorCore * coreRing;

  vec3 finalColor = diffuse + wireColor + specHighlight + coreGlow;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

const particleVertexShader = `
attribute float aSize;
attribute float aSpeed;
uniform float uTime;
varying float vAlpha;

void main() {
  vec3 pos = position;
  pos.y += sin(uTime * aSpeed + pos.x * 2.0) * 0.06;
  pos.x += cos(uTime * aSpeed * 0.7 + pos.y * 1.5) * 0.04;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (250.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  vAlpha = 0.4 + 0.4 * sin(uTime * aSpeed * 2.0);
}
`

const particleFragmentShader = `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float alpha = (1.0 - d * 2.0) * vAlpha * 0.6;
  gl_FragColor = vec4(uColor, alpha);
}
`

function NeuralOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { mouse } = useThree()

  const mouseTarget = useRef({ x: 0, y: 0 })
  const smoothRot = useRef({ x: 0, y: 0 })

  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(2.2, 0.6, 400, 100, 3, 7),
    [],
  )

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorPink: { value: new THREE.Color('#FF1493') },   // hot pink lines
      uColorCore: { value: new THREE.Color('#1C3B8B') },   // dark blue core
    }),
    [],
  )

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t
    }

    mouseTarget.current.x = mouse.x * 0.0015
    mouseTarget.current.y = mouse.y * 0.0015

    // Slow rotation — centered, no drift
    meshRef.current.rotation.y += 0.0007
    meshRef.current.rotation.x += 0.0004

    smoothRot.current.x += 0.04 * (mouseTarget.current.y - smoothRot.current.x)
    smoothRot.current.y += 0.04 * (mouseTarget.current.x - smoothRot.current.y)

    meshRef.current.rotation.x += smoothRot.current.x * 0.2
    meshRef.current.rotation.y += smoothRot.current.y * 0.2
  })

  return (
    <Float speed={0.35} rotationIntensity={0.05} floatIntensity={0.08}>
      <mesh ref={meshRef} geometry={geometry} scale={0.7} castShadow>
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 250
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, sizes, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.8 + Math.random() * 2.2

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      sizes[i] = 0.4 + Math.random() * 1.5
      speeds[i] = 0.3 + Math.random() * 0.7
    }

    return { positions, sizes, speeds }
  }, [])

  const particleUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#FF1493') }, // pink particles
    }),
    [],
  )

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial
      mat.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={particleUniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function FractalOrb() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.03} />
        <NeuralOrb />
        <Particles />
      </Canvas>
    </div>
  )
}
