export const roadVertex = `
varying vec2 vUv;
varying float vDirection;

void main() {
    vUv = uv;
    vDirection = (modelMatrix[1][1] > 0.0) ? 1.0 : -1.0;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = max(-mvPosition.z, 1.0);
    float size = 120.0 / dist;
    
    gl_PointSize = clamp(size, 2.0, 64.0);
    gl_Position = projectionMatrix * mvPosition;
}
`;
