export const planeVertex = `
varying vec2 vUv;

attribute float aRandom;

uniform float time;
uniform float hover;

void main() {
    vUv = uv;
    vec3 pos = position;

    float anchor = 1.0 - vUv.x; 
    float wave = sin(pos.x * 0.2 + time * 2.0) * 0.8;
    
    wave += cos(pos.y * 0.15 + time * 1.2) * 0.3;

    pos.z += wave * anchor;
    pos.z += sin(time * 10.0 * aRandom) * hover * 0.2 * anchor;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    float pulse = 1.0 + (hover * 0.15 * sin(time * 3.0));
    gl_PointSize = 40.0 * pulse * (1.0 / -mvPosition.z);
    
    gl_Position = projectionMatrix * mvPosition;
}
`;
