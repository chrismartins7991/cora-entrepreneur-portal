import * as THREE from 'three';

export const createHologramShader = () => new THREE.ShaderMaterial({
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

export const createRingShader = () => new THREE.ShaderMaterial({
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