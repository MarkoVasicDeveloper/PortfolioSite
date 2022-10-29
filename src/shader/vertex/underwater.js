export const underwaterVertex = `
precision highp float;
precision highp int;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vNormal = normal;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`