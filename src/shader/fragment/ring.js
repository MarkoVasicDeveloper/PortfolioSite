export const ringFragment = `

varying vec2 vUv;

void main( void ) {
	vec2 uv = ( vUv + 0.5 );
	
	gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0);

}
`