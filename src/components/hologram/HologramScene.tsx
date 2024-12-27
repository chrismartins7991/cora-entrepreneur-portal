import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createHologramShader } from './HologramShader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface HologramSceneProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const HologramScene = ({ containerRef }: HologramSceneProps) => {
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, // Increased FOV to see more of the model
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      logarithmicDepthBuffer: true
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Add controls with limitations
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 8;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = (3 * Math.PI) / 4;
    controls.enablePan = false;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x8CECFE, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create hologram material
    const hologramMaterial = createHologramShader();

    // Load 3D Model
    const loader = new GLTFLoader();
    console.log('Starting to load model...');
    
    loader.load(
      '/Human-Body.glb',
      (gltf) => {
        console.log('Model loaded successfully');
        const model = gltf.scene;
        
        model.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.material = hologramMaterial;
          }
        });

        // Adjust model scale and position
        model.scale.set(1.2, 1.2, 1.2);
        model.position.set(0, -2, 0); // Moved down to show full body
        model.rotation.y = Math.PI; // Rotate 180 degrees to face the camera

        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        if (gltf.animations.length) {
          console.log('Playing model animations');
          const idleAnimation = mixer.clipAction(gltf.animations[0]);
          idleAnimation.play();
        }

        const clock = new THREE.Clock();
        
        const animate = () => {
          requestAnimationFrame(animate);
          const delta = clock.getDelta();
          mixer.update(delta);
          controls.update();

          scene.traverse((object) => {
            if (object instanceof THREE.Mesh && object.material instanceof THREE.ShaderMaterial) {
              object.material.uniforms.time.value = clock.getElapsedTime();
            }
          });

          renderer.render(scene, camera);
        };

        // Set initial camera position
        camera.position.set(0, 0, 6); // Moved camera back to see full body
        camera.lookAt(0, -1, 0); // Look at the center of the model

        animate();
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return null;
};