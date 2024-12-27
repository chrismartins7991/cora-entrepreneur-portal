import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GlassCard } from '@/components/GlassCard';
import { ProgressCircle } from '@/components/ProgressCircle';

export default function Entrepreneur() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Hologram shader material
    const hologramShader = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowColor: { value: new THREE.Color(0x00ffff) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vPosY;
        void main() {
          vUv = uv;
          vPosY = position.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 glowColor;
        varying vec2 vUv;
        varying float vPosY;
        
        void main() {
          float scanLine = smoothstep(0.0, 0.1, fract(vPosY * 10.0 - time));
          float glow = 0.6 + 0.4 * sin(time + vUv.y * 20.0);
          vec3 color = glowColor * glow;
          float alpha = 0.6 * glow + 0.3 * scanLine;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Create human mesh with improved geometry
    const createHumanMesh = () => {
      const group = new THREE.Group();

      // Main body - using smoother geometry
      const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.2, 16, 32);
      const body = new THREE.Mesh(bodyGeometry, hologramShader);
      body.position.y = 0;
      group.add(body);

      // Head - smoother sphere
      const headGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const head = new THREE.Mesh(headGeometry, hologramShader);
      head.position.y = 0.9;
      group.add(head);

      // Arms - smoother capsules
      const armGeometry = new THREE.CapsuleGeometry(0.08, 0.8, 8, 16);
      
      // Left arm
      const leftArm = new THREE.Mesh(armGeometry, hologramShader);
      leftArm.position.set(-0.4, 0.3, 0);
      leftArm.rotation.z = Math.PI / 8;
      group.add(leftArm);

      // Right arm
      const rightArm = new THREE.Mesh(armGeometry, hologramShader);
      rightArm.position.set(0.4, 0.3, 0);
      rightArm.rotation.z = -Math.PI / 8;
      group.add(rightArm);

      // Legs - smoother capsules
      const legGeometry = new THREE.CapsuleGeometry(0.1, 0.8, 8, 16);
      
      // Left leg
      const leftLeg = new THREE.Mesh(legGeometry, hologramShader);
      leftLeg.position.set(-0.2, -0.8, 0);
      group.add(leftLeg);

      // Right leg
      const rightLeg = new THREE.Mesh(legGeometry, hologramShader);
      rightLeg.position.set(0.2, -0.8, 0);
      group.add(rightLeg);

      return group;
    };

    const human = createHumanMesh();
    scene.add(human);

    // Add holographic rings with shader material
    const ringGeometry = new THREE.TorusGeometry(1, 0.02, 16, 100);
    const ringMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          float pulse = 0.5 + 0.5 * sin(time * 2.0 + vUv.x * 10.0);
          vec3 color = vec3(0.0, 0.8, 1.0) * pulse;
          float alpha = 0.3 * pulse;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ring2 = ring1.clone();
    ring2.scale.set(1.5, 1.5, 1.5);
    scene.add(ring2);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x8CECFE, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 5;

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      
      // Update shader uniforms
      hologramShader.uniforms.time.value = time;
      ringMaterial.uniforms.time.value = time;

      human.rotation.y += 0.005;
      ring1.rotation.z += 0.01;
      ring2.rotation.z -= 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Mock data (in a real app, this would come from the Whoop API)
  const healthMetrics = {
    stress: 65,
    hydration: 82,
    energy: 75,
  };

  return (
    <div className="min-h-screen w-full p-4 relative">
      <div 
        ref={containerRef} 
        className="w-full aspect-square max-w-2xl mx-auto mb-8 relative"
        style={{
          background: 'radial-gradient(circle at center, rgba(13,71,161,0.1) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <GlassCard className="flex flex-col items-center justify-center p-6 backdrop-blur-lg">
          <h3 className="text-lg font-semibold mb-4 text-cora-lightBlue">Stress Level</h3>
          <ProgressCircle value={healthMetrics.stress} className="animate-pulse" />
        </GlassCard>

        <GlassCard className="flex flex-col items-center justify-center p-6 backdrop-blur-lg">
          <h3 className="text-lg font-semibold mb-4 text-cora-lightBlue">Hydration</h3>
          <ProgressCircle value={healthMetrics.hydration} className="animate-pulse" />
        </GlassCard>

        <GlassCard className="flex flex-col items-center justify-center p-6 backdrop-blur-lg">
          <h3 className="text-lg font-semibold mb-4 text-cora-lightBlue">Energy Level</h3>
          <ProgressCircle value={healthMetrics.energy} className="animate-pulse" />
        </GlassCard>
      </div>
    </div>
  );
}