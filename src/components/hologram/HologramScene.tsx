import { useEffect } from 'react';
import * as THREE from 'three';
import { setupLighting } from './SceneLighting';
import { setupControls } from './SceneControls';
import { loadModel } from './ModelLoader';

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
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      logarithmicDepthBuffer: true
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Setup lighting
    setupLighting(scene);

    // Setup controls
    const controls = setupControls(camera, renderer);

    // Set initial camera position
    camera.position.set(0, 0, 6);
    camera.lookAt(0, -1, 0);

    const clock = new THREE.Clock();
    let mixer: THREE.AnimationMixer;

    // Load model
    loadModel(scene, {
      onLoad: (model, modelMixer) => {
        mixer = modelMixer;
      },
      onProgress: (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      onError: (error) => {
        console.error('Error loading model:', error);
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      
      if (mixer) {
        mixer.update(delta);
      }
      
      controls.update();

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.material instanceof THREE.ShaderMaterial) {
          object.material.uniforms.time.value = clock.getElapsedTime();
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