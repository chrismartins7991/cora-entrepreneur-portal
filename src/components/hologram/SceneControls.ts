import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const setupControls = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 3;
  controls.maxDistance = 8;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = (3 * Math.PI) / 4;
  controls.enablePan = false;
  
  return controls;
};