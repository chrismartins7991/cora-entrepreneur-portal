import * as THREE from 'three';

export const setupLighting = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x8CECFE, 2);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
};