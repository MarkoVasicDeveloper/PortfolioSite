export const planeFragment = `

varying vec2 vUv;

uniform sampler2D image;

void main() {
	vec4 finImage = texture2D(image, vUv);

	gl_FragColor = finImage;
}
`