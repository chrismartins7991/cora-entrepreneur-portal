import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createHologramShader } from './HologramShader';

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

    // Create a basic humanoid shape using geometry
    const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
    const hologramMaterial = createHologramShader();
    const humanoid = new THREE.Mesh(geometry, hologramMaterial);
    
    // Add limbs
    const armGeometry = new THREE.CapsuleGeometry(0.15, 0.7, 4, 8);
    const leftArm = new THREE.Mesh(armGeometry, hologramMaterial);
    const rightArm = new THREE.Mesh(armGeometry, hologramMaterial);
    
    leftArm.position.set(-0.7, 0, 0);
    rightArm.position.set(0.7, 0, 0);
    
    const legGeometry = new THREE.CapsuleGeometry(0.2, 1, 4, 8);
    const leftLeg = new THREE.Mesh(legGeometry, hologramMaterial);
    const rightLeg = new THREE.Mesh(legGeometry, hologramMaterial);
    
    leftLeg.position.set(-0.3, -1, 0);
    rightLeg.position.set(0.3, -1, 0);
    
    // Create a group to hold all parts
    const humanoidGroup = new THREE.Group();
    humanoidGroup.add(humanoid);
    humanoidGroup.add(leftArm);
    humanoidGroup.add(rightArm);
    humanoidGroup.add(leftLeg);
    humanoidGroup.add(rightLeg);
    
    // Scale and position the group
    humanoidGroup.scale.set(1, 1, 1);
    humanoidGroup.position.set(0, 1, 0);
    scene.add(humanoidGroup);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x8CECFE, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Position camera
    camera.position.set(0, 1, 4);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate the humanoid
      humanoidGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.5;

      // Update shader uniforms
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.material instanceof THREE.ShaderMaterial) {
          object.material.uniforms.time.value = elapsed;
        }
      });

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