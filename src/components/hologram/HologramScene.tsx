import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

    // Create hologram material
    const hologramMaterial = new THREE.ShaderMaterial({
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

    // Load human model
    const loader = new GLTFLoader();
    console.log('Starting to load human model...');
    
    loader.load(
      '/models/human.glb',
      (gltf) => {
        console.log('Human model loaded successfully');
        const human = gltf.scene;
        
        // Apply material to all meshes
        human.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = hologramMaterial;
          }
        });

        // Position and scale the model
        human.scale.set(2, 2, 2);
        human.position.set(0, -1, 0);
        human.rotation.y = Math.PI; // Make the model face the camera
        scene.add(human);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading human model:', error);
      }
    );

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