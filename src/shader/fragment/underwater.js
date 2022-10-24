export const underwaterFragment = `
precision highp float;
precision highp int;

varying vec2 vUv;

uniform float resolution;
uniform float time;
uniform float backgroundAlpha;
uniform float rayBrightness;
uniform vec3 rayColor;

float causticPatternFn(vec2 pos) {
	return (
        sin( pos.x * 60.0 + time )
		+ pow( sin( -pos.x * 13.0 + time ), 1.0 )
		+ pow( sin( pos.x * 30.0 + time ), 2.0 )
		+ pow( sin( pos.x * 50.0 + time ), 2.0 )
		+ pow( sin( pos.x * 80.0 + time ), 2.0 )
		+ pow( sin( pos.x * 90.0 + time ), 2.0 )
		+ pow( sin( pos.x * 12.0 + time ), 2.0 )
    ) / 2.0;
}

void main( void ) {
	vec2 uv = ( vUv - 0.5 ) * resolution;
	float pattern = pow(
	    0.2 * rayBrightness * causticPatternFn( uv ),
	    4.0
    );
	
	gl_FragColor = vec4( rayColor, max( backgroundAlpha, pattern ) );

}
`