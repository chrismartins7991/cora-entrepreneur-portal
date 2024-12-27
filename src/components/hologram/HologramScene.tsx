import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createHologramShader, createRingShader } from './HologramShader';

interface HologramSceneProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const HologramScene = ({ containerRef }: HologramSceneProps) => {
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create materials
    const hologramShader = createHologramShader();
    const ringShader = createRingShader();

    // Load human model
    const loader = new GLTFLoader();
    loader.load(
      '/models/human.glb',
      (gltf) => {
        const human = gltf.scene;
        human.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = hologramShader;
          }
        });
        human.scale.set(1.5, 1.5, 1.5);
        human.position.y = -0.5;
        scene.add(human);

        console.log('Human model loaded successfully');
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
      },
      (error) => {
        console.error('Error loading human model:', error);
      }
    );

    // Create rings
    const ringGeometry = new THREE.TorusGeometry(1, 0.02, 16, 100);
    const ring1 = new THREE.Mesh(ringGeometry, ringShader);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ring2 = ring1.clone();
    ring2.scale.set(1.5, 1.5, 1.5);
    scene.add(ring2);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x8CECFE, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 5;

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      
      // Update shader uniforms
      hologramShader.uniforms.time.value = time;
      ringShader.uniforms.time.value = time;

      // Rotate rings
      ring1.rotation.z += 0.01;
      ring2.rotation.z -= 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
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
      renderer.dispose();
    };
  }, []);

  return null;
};