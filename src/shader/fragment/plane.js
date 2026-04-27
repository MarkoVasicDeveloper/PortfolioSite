export const planeFragment = `
varying vec2 vUv;
uniform sampler2D image;
uniform float hover;
uniform float time;

void main() {
    vec2 uv = vUv;

    float shift = hover * 0.012 * sin(time * 2.0);
    
    float r = texture2D(image, uv + vec2(shift, 0.0)).r;
    float g = texture2D(image, uv).g;
    float b = texture2D(image, uv - vec2(shift, 0.0)).b;
    
    vec3 color = vec3(r, g, b);

    float edgeGlow = pow(1.0 - vUv.x, 3.0) * 0.4;
    float topBottomGlow = pow(1.0 - vUv.y, 3.0) * 0.2 + pow(vUv.y, 3.0) * 0.2;
    
    color += (edgeGlow + topBottomGlow) * hover;

    float dist = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.4, dist);

    if (alpha < 0.1) discard;

    gl_FragColor = vec4(color, alpha);
}
`;
