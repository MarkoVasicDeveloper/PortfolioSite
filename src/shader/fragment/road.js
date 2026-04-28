export const roadFragment = `
uniform float time;
uniform vec3 color;
varying vec2 vUv;
varying float vDirection;

void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(gl_PointCoord, center);
    
    float core = 1.0 - smoothstep(0.1, 0.12, dist);
    
    float correctedUvY = (vDirection > 0.0) ? vUv.y : (1.0 - vUv.y);

    float offsetTime = time * 0.8 - correctedUvY * 3.0;
    float pulse = fract(offsetTime); 
    
    float ringRadius = 0.1 + pulse * 0.4; 
    float ringWidth = 0.1; 
    float ring = smoothstep(ringRadius - ringWidth, ringRadius, dist) - 
                 smoothstep(ringRadius, ringRadius + ringWidth, dist);
                 
    ring *= pow(1.0 - pulse, 3.0); 

    vec3 finalColor = color * (core + ring * 1.5);
    if (dist > 0.5) discard;
    
    float alpha = core + ring;
    gl_FragColor = vec4(finalColor, alpha);
}
`;
