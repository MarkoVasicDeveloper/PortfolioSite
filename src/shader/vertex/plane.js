export const planeVertex = `
varying vec2 vUv;

attribute float aRandom;
attribute float aDirection;

uniform float time;
uniform float hover;

void main () {
	vUv = uv;

	vec3 pos = position;

	// pos.x += sin(5. * time * aRandom) * aDirection * hover;
	// pos.y += sin(5. * time * aRandom) * aDirection * hover;
	pos.z += sin(5. * time * aRandom) * aDirection * hover * 10.;

	vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
	gl_PointSize = 15. * ( 1. / - mvPosition.z);
	gl_Position = projectionMatrix * mvPosition;
}
`