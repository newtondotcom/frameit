"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import type { Group } from "three"

// This would be replaced with your actual 3D models
function FrameModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  // In a real implementation, you would load your actual model
  // const { scene } = useGLTF('/path-to-your-model.glb')

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[5, 3, 0.2]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[4.5, 2.5, 0.01]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </group>
  )
}

function DisplayModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[4, 2.2, 0.1]} />
        <meshStandardMaterial color="#ddd" />
      </mesh>
    </group>
  )
}

function BatteryModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[1.5, 0.8, 0.3]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  )
}

function ConnectorModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}

function AssemblyAnimation() {
  const frameRef = useRef<Group>(null)
  const displayRef = useRef<Group>(null)
  const batteryRef = useRef<Group>(null)
  const connectorRef = useRef<Group>(null)
  const [scrollY, setScrollY] = useState(0)
  const { viewport } = useThree()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame(() => {
    if (!frameRef.current || !displayRef.current || !batteryRef.current || !connectorRef.current) return

    // Calculate animation progress based on scroll position
    // This is a simplified example - you would adjust these values based on your actual page layout
    const scrollProgress = Math.min(Math.max(scrollY / 500, 0), 1)

    // Animate components coming together
    frameRef.current.position.y = 2 * (1 - scrollProgress)
    displayRef.current.position.x = -3 * (1 - scrollProgress)
    batteryRef.current.position.x = 3 * (1 - scrollProgress)
    connectorRef.current.position.y = -2 * (1 - scrollProgress)

    // Rotate the entire assembly
    frameRef.current.rotation.y = scrollProgress * Math.PI * 0.5
    displayRef.current.rotation.y = scrollProgress * Math.PI * 0.5
    batteryRef.current.rotation.y = scrollProgress * Math.PI * 0.5
    connectorRef.current.rotation.y = scrollProgress * Math.PI * 0.5
  })

  return (
    <>
      <FrameModel ref={frameRef} />
      <DisplayModel ref={displayRef} position={[0, 0, 0.2]} scale={0.9} />
      <BatteryModel ref={batteryRef} position={[0, -1.2, 0.2]} />
      <ConnectorModel ref={connectorRef} position={[1.5, -1, 0.2]} />
    </>
  )
}

export default function ProductShowcase() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <AssemblyAnimation />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

