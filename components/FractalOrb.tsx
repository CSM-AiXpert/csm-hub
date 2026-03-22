'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = mvPosition.xyz;
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorCyan;
uniform vec3 uColorBlue;
uniform vec3 uColorRed;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  // Deep space base
  vec3 baseColor = vec3(0.01, 0.015, 0.03);

  // Layered FBM for organic energy feel
  vec2 q = vec2(fbm(vUv * 3.0 + uTime * 0.1), fbm(vUv * 3.0 + vec2(1.0)));
  vec2 r = vec2(fbm(vUv * 4.0 + q + vec2(1.7, 9.2) + 0.12 * uTime), fbm(vUv * 4.0 + q + vec2(8.3, 2.8) + 0.11 * uTime));
  float f = fbm(vUv * 2.0 + r);

  // Energy core glow
  float energyPulse = f * f * f * f * 4.0;
  vec3 energyColor = mix(uColorCyan, uColorBlue, f);
  energyColor = mix(energyColor, uColorRed, pow(f, 3.0) * 0.3);

  // Lighting
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(-vViewPosition);

  vec3 mainLightDir = normalize(vec3(1.5, 2.0, 1.0));
  vec3 fillLightDir = normalize(vec3(-1.5, -0.5, -2.0));

  float mainDiff = max(dot(normal, mainLightDir), 0.0);
  float fillDiff = max(dot(normal, fillLightDir), 0.0) * 0.25;

  vec3 reflectDir = reflect(-mainLightDir, normal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 128.0);

  // Rim / fresnel
  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.5);
  vec3 rimLight = mix(uColorCyan, uColorRed, fresnel) * fresnel * 1.8;

  // Data stream pulses
  float pulse1 = sin(vUv.y * 60.0 - uTime * 5.0);
  pulse1 = smoothstep(0.92, 1.0, pulse1) * 0.7;
  float pulse2 = sin(vUv.x * 30.0 + vUv.y * 20.0 - uTime * 2.5);
  pulse2 = smoothstep(0.88, 1.0, pulse2) * 0.5;
  float pulse3 = sin((vUv.x - vUv.y) * 40.0 - uTime * 3.5);
  pulse3 = smoothstep(0.90, 1.0, pulse3) * 0.4;

  vec3 pulseGlow =
    (uColorCyan * pulse1) +
    (uColorBlue * pulse2) +
    (uColorRed * pulse3 * 0.6);

  // Compose
  vec3 diffuse = baseColor * (mainDiff + fillDiff + 0.08);
  vec3 highlight = vec3(0.9, 0.95, 1.0) * spec * 1.2;
  vec3 finalColor = diffuse + energyColor * energyPulse * 0.6 + highlight + rimLight + pulseGlow;

  // Subtle vignette via world position
  float vignette = 1.0 - smoothstep(0.0, 2.5, length(vWorldPosition) * 0.15);
  finalColor *= vignette;

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
  pos.y += sin(uTime * aSpeed + pos.x * 2.0) * 0.08;
  pos.x += cos(uTime * aSpeed * 0.7 + pos.y * 1.5) * 0.06;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  vAlpha = 0.3 + 0.3 * sin(uTime * aSpeed * 2.0);
}
`

const particleFragmentShader = `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float alpha = (1.0 - d * 2.0) * vAlpha;
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
      uColorCyan: { value: new THREE.Color('#00e5ff') },
      uColorBlue: { value: new THREE.Color('#2E8EEA') },
      uColorRed: { value: new THREE.Color('#DD2C2C') },
    }),
    [],
  )

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t
    }

    mouseTarget.current.x = mouse.x * 0.002
    mouseTarget.current.y = mouse.y * 0.002

    // Slow majestic rotation
    meshRef.current.rotation.y += 0.0008
    meshRef.current.rotation.x += 0.0004
    meshRef.current.rotation.z += 0.0003

    // Smooth parallax
    smoothRot.current.x += 0.04 * (mouseTarget.current.y - smoothRot.current.x)
    smoothRot.current.y += 0.04 * (mouseTarget.current.x - smoothRot.current.y)

    meshRef.current.rotation.x += smoothRot.current.x * 0.25
    meshRef.current.rotation.y += smoothRot.current.y * 0.25
  })

  return (
    <Float speed={0.4} rotationIntensity={0.08} floatIntensity={0.12}>
      <mesh ref={meshRef} geometry={geometry} scale={0.65} castShadow>
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
  const count = 300
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, sizes, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 2.0

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      sizes[i] = 0.5 + Math.random() * 2.0
      speeds[i] = 0.3 + Math.random() * 0.8
    }

    return { positions, sizes, speeds }
  }, [])

  const particleUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#2E8EEA') },
    }),
    [],
  )

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial
      mat.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0003
      pointsRef.current.rotation.x += 0.0001
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
        <ambientLight intensity={0.04} />
        <NeuralOrb />
        <Particles />
      </Canvas>
    </div>
  )
}
