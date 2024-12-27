import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createHologramShader } from './HologramShader';

interface LoadModelCallbacks {
  onLoad: (model: THREE.Group, mixer: THREE.AnimationMixer) => void;
  onProgress: (progress: ProgressEvent<EventTarget>) => void;
  onError: (error: ErrorEvent) => void;
}

export const loadModel = (scene: THREE.Scene, callbacks: LoadModelCallbacks) => {
  const hologramMaterial = createHologramShader();
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

      model.scale.set(1.2, 1.2, 1.2);
      model.position.set(0, -2, 0);
      model.rotation.y = 0;

      scene.add(model);

      const mixer = new THREE.AnimationMixer(model);
      if (gltf.animations.length) {
        console.log('Playing model animations');
        const idleAnimation = mixer.clipAction(gltf.animations[0]);
        idleAnimation.play();
      }

      callbacks.onLoad(model, mixer);
    },
    callbacks.onProgress,
    callbacks.onError
  );
};