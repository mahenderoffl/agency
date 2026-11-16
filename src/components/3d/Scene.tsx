'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function WaveParticles({ count = 3000 }: { count?: number }) {
    const points = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Spread particles in a wave-like pattern
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;

            // Gradient from electric cyan to primary blue
            const t = Math.random();
            colors[i3] = t * 0.0 + (1 - t) * 0.0;       // R
            colors[i3 + 1] = t * 0.898 + (1 - t) * 0.4; // G
            colors[i3 + 2] = t * 1.0 + (1 - t) * 1.0;   // B
        }

        return { positions, colors };
    }, [count]);

    useFrame((state, delta) => {
        if (!points.current) return;

        // Rotate slowly
        points.current.rotation.x += delta * 0.05;
        points.current.rotation.y += delta * 0.025;

        // Mouse interaction - tilt based on mouse position
        points.current.rotation.x += mouse.y * 0.0005;
        points.current.rotation.y += mouse.x * 0.0005;

        // Wave animation on particles
        const positions = points.current.geometry.attributes.position.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = positions[i3];
            const z = positions[i3 + 2];

            // Create wave effect
            positions[i3 + 1] = Math.sin(x * 0.3 + time * 0.5) * Math.cos(z * 0.3 + time * 0.3) * 2;
        }

        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={points} positions={particles.positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00E5FF"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors
            />
            <bufferAttribute
                attach="geometry-attributes-color"
                args={[particles.colors, 3]}
            />
        </Points>
    );
}

function NeuralConnections({ count = 50 }: { count?: number }) {
    const linesRef = useRef<THREE.Group>(null);

    const nodes = useMemo(() => {
        const positions: THREE.Vector3[] = [];
        for (let i = 0; i < count; i++) {
            positions.push(new THREE.Vector3(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
            ));
        }
        return positions;
    }, [count]);

    const connections = useMemo(() => {
        const lines: [THREE.Vector3, THREE.Vector3][] = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].distanceTo(nodes[j]);
                if (distance < 4) {
                    lines.push([nodes[i], nodes[j]]);
                }
            }
        }
        return lines.slice(0, 100); // Limit connections for performance
    }, [nodes]);

    useFrame((state) => {
        if (!linesRef.current) return;
        linesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
        linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    });

    return (
        <group ref={linesRef}>
            {connections.map((conn, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[new Float32Array([
                                conn[0].x, conn[0].y, conn[0].z,
                                conn[1].x, conn[1].y, conn[1].z
                            ]), 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#0066FF" transparent opacity={0.3} />
                </line>
            ))}
            {nodes.map((node, i) => (
                <mesh key={i} position={node}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
}

export default function Scene() {
    return (
        <div className="scene-container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: 'linear-gradient(135deg, #0A1929 0%, #0A1929 50%, #0D2137 100%)'
        }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <WaveParticles count={2500} />
                <NeuralConnections count={40} />
            </Canvas>
        </div>
    );
}
