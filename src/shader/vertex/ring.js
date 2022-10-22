export const ringVertex = `
varying vec2 vUv;

uniform float time;

void main() {
  vUv = uv;
  // vec3 newPosition = vec3(position.x + sin(time), position.y, position.z);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`