!function(e,r,t,i){var s="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},a="function"==typeof s[t]&&s[t],o=a.i||{},n=a.cache||{},l="u">typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(r,o){if(!n[r]){if(!e[r]){if(i[r])return i[r];var h="function"==typeof s[t]&&s[t];if(!o&&h)return h(r,!0);if(a)return a(r,!0);if(l&&"string"==typeof r)return l(r);var d=Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}p.resolve=function(t){var i=e[r][1][t];return null!=i?i:t},p.cache={};var m=n[r]=new c.Module(r);e[r][0].call(m.exports,p,m,m.exports,s)}return n[r].exports;function p(e){var r=p.resolve(e);if(!1===r)return{};if(Array.isArray(r)){var t={__esModule:!0};return r.forEach(function(e){var r=e[0],i=e[1],s=e[2]||e[0],a=c(i);"*"===r?Object.keys(a).forEach(function(e){"default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})}):"*"===s?Object.defineProperty(t,r,{enumerable:!0,value:a}):Object.defineProperty(t,r,{enumerable:!0,get:function(){return"default"===s?a.__esModule?a.default:a:a[s]}})}),t}return c(r)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.require=l,this.exports={}},c.modules=e,c.cache=n,c.parent=a,c.distDir=void 0,c.publicUrl=void 0,c.devServer=void 0,c.i=o,c.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]},Object.defineProperty(c,"root",{get:function(){return s[t]}}),s[t]=c;for(var h=0;h<r.length;h++)c(r[h])}({"2wAO6":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"World",()=>v);var a=e("three"),o=e("../config/assets"),n=e("../shader/shaderRegistry"),l=e("../shader/uniforms"),c=e("./projectPanel"),h=e("../config/configIndex"),d=e("./road"),m=e("./background"),p=e("./textManager"),f=e("../infrastructure/three/diorama/hero/heroStageBuilder"),u=e("./frogCharacter"),g=e("../config/frogTriggerConfig");class v{constructor(e,r){this.sceneManager=e,this.assetManager=r,this.projectPanels=[],this.road=new(0,d.Road)(this.sceneManager),this.textManager=new(0,p.TextManager)(this.sceneManager,this.assetManager),this._lastTime=0,this._previousZoneId=null,this.frog=null,this.stageBuilder=null,this.fogBackground=null,this._init()}_init(){this._setupLights(),this._addStaticModels(),this._addProjectPanels(),this._addBackground()}_setupLights(){let e=new a.AmbientLight(0xffffff,.6);this.sceneManager.add(e);let r=new a.HemisphereLight(0xeeeeff,4473924,.8);r.position.set(0,20,0),this.sceneManager.add(r)}_addStaticModels(){o.ASSET_CONFIG.models.forEach(e=>{let r=this.assetManager.models[e.name];if(!r)return;if("frog"===e.name)return void this._addFrogCharacter(r,e);let t=r.scene||r;this._applyTransforms(t,e.transform),this._applyShaders(t,e),"office"===e.name&&this._setupHeroDiorama(t),this.sceneManager.add(t)})}_addFrogCharacter(e,r){this.frog=new(0,u.FrogCharacter)(e,this.sceneManager.camera,g.FROG_TRIGGER_CONFIG),this._applyTransforms(this.frog.container,r.transform),this.sceneManager.add(this.frog.container)}_applyTransforms(e,r){if(!r)return;let{position:t,scale:i,rotation:s}=r;t&&e.position.set(...t),i&&e.scale.set(...i),s&&e.rotation.set(...s)}_applyShaders(e,r){if(!r.shader||!l.SHADER_UNIFORMS[r.uniforms])return;let t=n.SHADER_REGISTRY[r.shader];e.traverse(e=>{e.isMesh&&(e.material=new a.ShaderMaterial({vertexShader:t.vertex,fragmentShader:t.fragment,uniforms:l.SHADER_UNIFORMS[r.uniforms]}))})}_setupHeroDiorama(e){this.stageBuilder=new(0,f.HeroStageBuilder)(this.sceneManager,e),this.stageBuilder.build(),this.stageBuilder.alignLightsToModel(),this._setOfficeVisibility(!0)}_setOfficeVisibility(e){this.stageBuilder&&(this.stageBuilder.officeScene&&(this.stageBuilder.officeScene.visible=e),this.stageBuilder.neonBlueLight&&(this.stageBuilder.neonBlueLight.visible=e),this.stageBuilder.topLight&&(this.stageBuilder.topLight.visible=e))}_addProjectPanels(){h.PANEL_CONFIG.forEach(e=>{let r=n.SHADER_REGISTRY[e.shaderKey],t=l.SHADER_UNIFORMS[e.uniforms],i=this.assetManager.textures[e.id];i&&t.image&&(t.image.value=i);let s=new(0,c.ProjectPanel)(e,r,t,this.assetManager);s.position.set(...e.transform.position),s.rotation.set(...e.transform.rotation),s.scale.set(...e.transform.scale),this.projectPanels.push(s),this.sceneManager.add(s)})}_addBackground(){this.fogBackground=new(0,m.Background)(n.SHADER_REGISTRY.fog,l.SHADER_UNIFORMS.fog),this.sceneManager.addBackground(this.fogBackground)}update(e){let r=e-this._lastTime;if(this._lastTime=e,this.road.update(e),Object.values(l.SHADER_UNIFORMS).forEach(r=>{r.time&&(r.time.value=e)}),this.projectPanels.forEach(r=>r.update(e)),this.frog&&(this.frog.update(r),this.frog.currentZoneId!==this._previousZoneId)){this._previousZoneId=this.frog.currentZoneId;let e="main_zone"===this.frog.currentZoneId;this._setOfficeVisibility(e)}}dispose(){this.road.dispose(),this.fogBackground.dispose(),this.projectPanels.forEach(e=>e.dispose()),this.sceneManager.scene.traverse(e=>{e.isMesh&&(e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(e=>e.dispose()):e.material.dispose())}),this.projectPanels=[],this.frog&&this.frog.dispose()}get points(){return this.road.points}}},{three:"hZcQL","../config/assets":"fiSph","../shader/shaderRegistry":"dcD1p","../shader/uniforms":"bqHHa","./projectPanel":"luUfh","../config/configIndex":"frv6Y","./road":"bbko8","./background":"8FuiA","./textManager":"8VTU0","../infrastructure/three/diorama/hero/heroStageBuilder":"bYqBu","./frogCharacter":"cWPjH","../config/frogTriggerConfig":"d9rWC","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],dcD1p:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"SHADER_REGISTRY",()=>u);var a=e("./fragment/matrix"),o=e("./vertex/matrix"),n=e("./fragment/plane"),l=e("./vertex/plane"),c=e("./vertex/road"),h=e("./fragment/road"),d=e("./vertex/underwater"),m=e("./fragment/underwater"),p=e("./fragment/fog"),f=e("./vertex/fog");let u={matrix:{vertex:o.matrixVertex,fragment:a.matrixFragment},plane:{vertex:l.planeVertex,fragment:n.planeFragment},road:{vertex:c.roadVertex,fragment:h.roadFragment},underwater:{vertex:d.underwaterVertex,fragment:m.underwaterFragment},fog:{vertex:f.fogVertex,fragment:p.fogFragment}}},{"./fragment/matrix":"JZNsd","./vertex/matrix":"dJvMA","./fragment/plane":"6dhrD","./vertex/plane":"aBncr","./vertex/road":"3tUbH","./fragment/road":"7Lpo7","./vertex/underwater":"6VF0f","./fragment/underwater":"fUbQx","./fragment/fog":"lbRJT","./vertex/fog":"9sUsa","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],JZNsd:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"matrixFragment",()=>a);let a=`
precision highp float;
precision highp int;

uniform float time;
uniform float speed;

uniform vec2 charSize;
uniform float charResolution;
uniform vec3 color;
uniform vec2 resolution;

varying vec2 vUv;

float seed = 2.0;

float random( float x ) {
    return fract( sin( x ) * 43758.5453 );
}

float random( vec2 st ) {
    return fract( sin( dot( st.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
}

float randomChar( vec2 outer, vec2 inner ) {
    vec2 margin = 1.0 - charSize;
    vec2 borders = step( margin, inner ) * step( margin, 1.0 - inner );
    return step(
        0.5,
        random( outer * seed + floor( inner * charResolution ) )
    ) * borders.x * borders.y;
}

vec4 matrix( vec2 st ) {
    float rows = 50.0;
    vec2 ipos = floor( st * rows ) + vec2( 1.0, 0.0 );

    ipos += vec2( 0.0, floor( time * speed * random( ipos.x ) ) );

    vec2 fpos = fract( st * rows );
    vec2 center = 0.5 - fpos;

    float pct = random( ipos );
    float glow = ( 1.0 - dot(center,center) * 3.0 ) * 2.0;

    float result = randomChar( ipos, fpos ) * pct * glow;
    return vec4( color * result, result );
}

void main() {
    
	vec2 st = vUv * resolution;
	gl_FragColor = vec4(.0, .0, .0, 1.) + matrix( st );
	
}
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],dJvMA:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"matrixVertex",()=>a);let a=`
precision highp float;
precision highp int;

varying vec2 vUv;

void main() {

    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"6dhrD":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"planeFragment",()=>a);let a=`
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
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],aBncr:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"planeVertex",()=>a);let a=`
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
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"3tUbH":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"roadVertex",()=>a);let a=`
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
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"7Lpo7":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"roadFragment",()=>a);let a=`
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
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"6VF0f":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"underwaterVertex",()=>a);let a=`
precision highp float;
precision highp int;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vNormal = normal;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],fUbQx:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"underwaterFragment",()=>a);let a=`
precision highp float;

uniform float time;
uniform float scale;
uniform float speed;

varying vec3 vNormal;
varying vec2 vUv;

float rand(in vec2 p)
{
	return abs( fract( sin(p.x * 95325.328 + p.y * -48674.077) + cos(p.x * -46738.322 + p.y * 76485.077) + time * speed ) -.5)+.5;
}
	
void main( void ) {
	
	vec2 position = ( vUv.xy ) * scale;

	vec3 color = vec3(rand( vec2(floor(position.x), floor(position.y) ) ), rand( vec2(floor(position.x) , floor(position.x) ) ) , rand( vec2(floor(position.x*.5) , floor(position.y*.5) ) ));
	float scale = 1.-pow( pow( (mod( position.x, 1.)-.5), 2.) + pow( (mod( position.y, 1.)-.5), 2.), .7 );
	
	gl_FragColor = vec4( color*scale, 1.);
}

`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],lbRJT:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"fogFragment",()=>a);let a=`
// http://casual-effects.blogspot.com/2013/08/starfield-shader.html
// #extension GL_OES_standard_derivatives : enable

#define iterations 17
#define volsteps 3
#define sparsity 0.5
#define stepsize 0.2
 #define frequencyVariation   1.3

precision highp float;
precision highp int;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 color;
uniform float time;
uniform float twinkleSpeed;
uniform float speed;
 
uniform float brightness;
uniform float distfading;
 

#define PI 3.141592653589793238462643383279

void main( void ) {

    vec2 uv = vUv.xy + 0.5;
    uv.x += time * speed * 0.1;
 
    vec3 dir = vec3(uv * 2.0, 1.0);
 
    float s = 0.1, fade = 0.01;
    vec3 starColor = vec3(0.0);
     
    for (int r = 0; r < volsteps; ++r) {
        vec3 p =  (time * speed * twinkleSpeed) + dir * (s * 0.5);
        p = abs(vec3(frequencyVariation) - mod(p, vec3(frequencyVariation * 2.0)));
 
        float prevlen = 0.0, a = 0.0;
        for (int i = 0; i < iterations; ++i) {
            p = abs(p);
            p = p * (1.0 / dot(p, p)) + (-sparsity); // the magic formula            
            float len = length(p);
            a += abs(len - prevlen); // absolute sum of average change
            prevlen = len;
        }
         
        a *= a * a; // add contrast
         
        // coloring based on distance        
        starColor += (vec3(s, s*s, s*s*s) * a * brightness + 1.0) * fade;
        fade *= distfading; // distance fading
        s += stepsize;
    }
     
    starColor = min(starColor, vec3(1.2));
 
    // Detect and suppress flickering single pixels (ignoring the huge gradients that we encounter inside bright areas)
    float intensity = min(starColor.r + starColor.g + starColor.b, 0.7);
 
    vec2 sgn = (vec2(vUv.xy)) * 2.0 - 1.0;
    vec2 gradient = vec2(dFdx(intensity) * sgn.x, dFdy(intensity) * sgn.y);
    float cutoff = max(max(gradient.x, gradient.y) - 0.1, 0.0);
    starColor *= max(1.0 - cutoff * 6.0, 0.3);
 
    // Motion blur; increases temporal coherence of undersampled flickering stars
    // and provides temporal filtering under true motion.  
    gl_FragColor = vec4( starColor * color, 1.0 );
}

`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"9sUsa":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"fogVertex",()=>a);let a=`
precision highp float;
precision highp int;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],bqHHa:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"SHADER_UNIFORMS",()=>n);var a=e("three");let o=()=>({image:{value:null},time:{value:0},hover:{value:0}}),n={underwater:{speed:{value:2},scale:{value:3},time:{value:0}},fog:{time:{value:0},color:{value:new a.Color(1,1,1)},twinkleSpeed:{value:20},speed:{value:1e-4},brightness:{value:.0018},distfading:{value:.2}},matrix:{color:{value:new a.Color(0,.70196,.14509)},resolution:{value:new a.Vector2(1.9461,1.9369)},charSize:{value:new a.Vector2(.8769,.9384)},charResolution:{value:7.72425},speed:{value:18.2645},time:{value:0}},road:{time:{value:0},color:{value:new a.Color(43775)}},main:o(),washer:o(),landary:o(),burger:o(),css:o(),react:o(),python:o()}},{three:"hZcQL","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],luUfh:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"ProjectPanel",()=>d);var a=e("three"),o=e("../core/logger"),n=e("three/examples/jsm/geometries/TextGeometry");let l=new a.PlaneGeometry(6,4,300,200),c=l.attributes.position.count,h=new a.BufferAttribute(new Float32Array(c),1);for(let e=0;e<c;e++)h.setX(e,.1*Math.random()+.1);l.setAttribute("aRandom",h);class d extends a.Group{constructor(e,r,t,i){super(),this.name=`panel-${e.name}`,this.ring=null,e.text&&this._createText(e.text,i.fonts.fontJson),e.attachments&&Array.isArray(e.attachments)&&e.attachments.forEach(e=>{this._createAttachment(e,i)}),this._build(e,r,t)}_createText(e,r){if(!r)return void o.Logger.warn("ProjectPanel","Font not loaded, skipping text creation.");let t=new(0,n.TextGeometry)(e,{font:r,size:.4,height:.01,curveSegments:12}),i=new a.MeshStandardMaterial({color:"#525B68"}),s=new a.Mesh(t,i);s.position.x=4,this.add(s)}_createAttachment(e,r){let t=r.iconModels[e.modelName];if(!t)return void o.Logger.warn("Project panel",`Model ${e.modelName} nof found!`);let i=t.scene?t.scene.clone():t.clone(),[s,a,n]=e.offset;i.position.set(s,a,n);let[l,c,h]=e.scale;if(i.scale.set(l,c,h),e.rotation){let[r,t,s]=e.rotation;i.rotation.set(r,t,s)}i.traverse(r=>{r.isMesh&&(r.name="attachment",r.userData.link=e.link)}),i.userData.link=e.link,i.name="attachment",this.add(i)}_build(e,r,t){let i=new a.ShaderMaterial({vertexShader:r.vertex,fragmentShader:r.fragment,uniforms:t,transparent:!0,depthTest:!1,depthWrite:!1}),s=new a.Points(l,i);s.name="link",s.userData.link=e.link,this.add(s),this._createDecorations()}_createDecorations(){let e=[new a.Vector3(0,1.5,0),new a.Vector3(0,4,0)],r=new a.BufferGeometry().setFromPoints(e),t=new a.LineBasicMaterial({color:"#525B68"}),i=new a.Line(r,t);i.position.set(3.5,-5,0);let s=new a.SphereGeometry(.05,10,10),o=new a.MeshStandardMaterial({color:"#525B68"}),n=new a.Mesh(s,o);n.position.set(0,4.4,0);let l=new a.RingGeometry(.05,.07,30),c=new a.MeshStandardMaterial({color:"#525B68"});this.ring=new a.Mesh(l,c),n.add(this.ring),i.add(n),this.add(i)}update(e){if(this.ring){let r=1+3*Math.sin(3*e);this.ring.scale.set(r,r,1)}}dispose(){this.traverse(e=>{(e.isMesh||e.isPoints||e.isLine)&&(e.geometry&&e.geometry!==l&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(e=>this._disposeMaterial(e)):this._disposeMaterial(e.material)))}),this.clear()}_disposeMaterial(e){for(let r in e.dispose(),e)e[r]&&e[r].isTexture&&e[r].dispose();if(e.uniforms)for(let r in e.uniforms){let t=e.uniforms[r];t.value&&t.value.isTexture&&t.value.dispose()}}}},{three:"hZcQL","../core/logger":"hBKGG","three/examples/jsm/geometries/TextGeometry":"lsxu5","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],lsxu5:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"TextGeometry",()=>o);var a=e("three");class o extends a.ExtrudeGeometry{constructor(e,r={}){let t=r.font;if(void 0===t)super();else{let i=t.generateShapes(e,r.size);r.depth=void 0!==r.height?r.height:50,void 0===r.bevelThickness&&(r.bevelThickness=10),void 0===r.bevelSize&&(r.bevelSize=8),void 0===r.bevelEnabled&&(r.bevelEnabled=!1),super(i,r)}this.type="TextGeometry"}}},{three:"hZcQL","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],bbko8:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"Road",()=>l);var a=e("three"),o=e("../shader/shaderRegistry"),n=e("../shader/uniforms");class l{constructor(e){this.sceneManager=e,this.group=new a.Group,this.sceneManager.add(this.group),this.progress=0,this.materials=[],this.points=[],this._createPath(),this._createVisualRoad()}_createPath(){let e=22.5,r=[22,18,22,62];for(let t=0;t<4;t++){let i=new a.EllipseCurve(3===t?62.5:e,0,r[t],r[t],0,Math.PI,t%2!=0,0),s=3!==t?i.getPoints(300).reverse():i.getPoints(900);this.points.push(...s),e+=40}}_createVisualRoad(){let e=new a.RingGeometry(15,25,30,4,0,Math.PI),r=o.SHADER_REGISTRY.road,t=22.5;for(let i=0;i<3;i++){let s=new a.ShaderMaterial({vertexShader:r.vertex,fragmentShader:r.fragment,uniforms:a.UniformsUtils.clone(n.SHADER_UNIFORMS.road),transparent:!0,depthWrite:!1}),o=new a.Points(e,s);o.position.x=t,o.rotation.x=i%2==0?-Math.PI/2:Math.PI/2,this.materials.push(s),this.group.add(o),t+=40}let i=new a.RingGeometry(55,65,90,4,0,Math.PI),s=new a.ShaderMaterial({vertexShader:r.vertex,fragmentShader:r.fragment,uniforms:a.UniformsUtils.clone(n.SHADER_UNIFORMS.road),transparent:!0,depthWrite:!1}),l=new a.Points(i,s);l.position.x=62.5,l.rotation.x=Math.PI/2,this.materials.push(s),this.group.add(l)}update(e){this.materials&&this.materials.forEach(r=>{r.uniforms.time.value=e})}dispose(){this.group.traverse(e=>{(e.isMesh||e.isPoints)&&(e.geometry&&e.geometry.dispose(),e.material&&this._disposeMaterial(e.material))}),this.materials=[],this.points=[],this.sceneManager&&this.group&&this.sceneManager.scene.remove(this.group),this.group.clear()}_disposeMaterial(e){if(e.dispose(),e.uniforms)for(let r in e.uniforms){let t=e.uniforms[r];t.value&&t.value.isTexture&&t.value.dispose()}}}},{three:"hZcQL","../shader/shaderRegistry":"dcD1p","../shader/uniforms":"bqHHa","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"8FuiA":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"Background",()=>o);var a=e("three");class o extends a.Mesh{constructor(e,r){super(new a.PlaneGeometry(2,2),new a.ShaderMaterial({fragmentShader:e.fragment,vertexShader:e.vertex,uniforms:r,transparent:!0,depthTest:!1,depthWrite:!1})),this.name="background"}dispose(){this.geometry.dispose(),this.material.dispose()}}},{three:"hZcQL","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"8VTU0":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"TextManager",()=>h);var a=e("./text3d"),o=e("./techText"),n=e("../config/configIndex"),l=e("../shader/shaderRegistry"),c=e("../shader/uniforms");class h{constructor(e,r){this.sceneManager=e,this.assetManager=r,this.texts=[],this._init()}_init(){this._addTitles(),this._addTechTexts(),this._addHeroText()}_addTitles(){n.TITLES_CONFIG.forEach(e=>{let r=new(0,a.Text3D)(e.text,this.assetManager.fonts.fontPremanentMarker,{position:[...e.position],rotationY:e.rotationY,size:e.size,scale:[0,0,0],name:"title"});this._register(r)})}_addTechTexts(){n.TECH_TEXT_CONFIG.forEach(e=>{let r=new(0,o.TechText)(e,this.assetManager.fonts.fontJson);this._register(r)})}_addHeroText(){this.heroText=new(0,a.Text3D)("Marko Vasic",this.assetManager.fonts.fontJustAnotherHand,{size:3.9,position:[88,1,0],rotationY:-Math.PI/2,shaderData:l.SHADER_REGISTRY.underwater,uniforms:c.SHADER_UNIFORMS.underwater}),this._register(this.heroText)}_register(e){this.texts.push(e),this.sceneManager.add(e)}dispose(){this.texts.forEach(e=>{e.dispose&&e.dispose(),this.sceneManager.scene.remove(e)}),this.heroText.dispose(),this.texts=[]}}},{"./text3d":"k3LRo","./techText":"63hWr","../config/configIndex":"frv6Y","../shader/shaderRegistry":"dcD1p","../shader/uniforms":"bqHHa","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],k3LRo:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"Text3D",()=>n);var a=e("three"),o=e("three/examples/jsm/geometries/TextGeometry");class n extends a.Mesh{constructor(e,r,t={}){super(n._createGeometry(e,r,t),n._createMaterial(t)),this._applyOptions(t)}static _createGeometry(e,r,t){return new(0,o.TextGeometry)(e,{font:r,size:t.size||1,height:t.height||.01,curveSegments:12})}static _createMaterial(e){return e.shaderData?new a.ShaderMaterial({vertexShader:e.shaderData.vertex,fragmentShader:e.shaderData.fragment,uniforms:e.uniforms||{},transparent:!0}):new a.MeshStandardMaterial({color:e.color||"#525B68"})}_applyOptions(e){this.name=e.name||"Text3D",e.name&&(this.name=e.name),e.position&&this.position.set(...e.position),void 0!==e.rotationY&&(this.rotation.y=e.rotationY),e.scale&&this.scale.set(...e.scale)}dispose(){this.geometry.dispose(),this.material.dispose()}}},{three:"hZcQL","three/examples/jsm/geometries/TextGeometry":"lsxu5","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"63hWr":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"TechText",()=>n);var a=e("three"),o=e("three/examples/jsm/geometries/TextGeometry");class n extends a.Mesh{constructor(e,r){super(new(0,o.TextGeometry)(e.content,{font:r,size:.5,height:.01,curveSegments:12}),new a.MeshStandardMaterial({color:"#525B68"})),this.name="technologyText",this.position.set(...e.position),this.rotation.y=e.rotationY,this.scale.set(0,0,0)}dispose(){this.geometry.dispose(),this.material.dispose()}}},{three:"hZcQL","three/examples/jsm/geometries/TextGeometry":"lsxu5","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],bYqBu:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"HeroStageBuilder",()=>n);var a=e("three"),o=e("../../../../config/heroDioram");class n{constructor(e,r){this.sceneManager=e,this.office=r,this.topLight=null,this.lightTarget=null,this.officeScene=null,this.neonBlueLight=null,this.customNeonTarget=null,this.screenMesh=null,this._vModelPos=new a.Vector3,this._vLocalCenter=new a.Vector3,this._vRealScreenPos=new a.Vector3}build(){this.officeScene=this.office.scene||this.office,this.officeScene.traverse(e=>{if(e.isMesh){if("screen"===e.name.toLowerCase())return void this._setupScreenMesh(e);e.material&&this._optimizeMaterial(e,.3,.8,.1),e.castShadow=!0,e.receiveShadow=!0}}),this._initLights()}_optimizeMaterial(e,r,t,i){let s=e.material,o=s.color?s.color.clone():new a.Color(0xffffff);o.multiplyScalar(r),e.material=new a.MeshStandardMaterial({color:o,map:s.map,roughness:t,metalness:i}),s.dispose()}_setupScreenMesh(e){let r=e.material;e.material=new a.MeshStandardMaterial({color:new a.Color(1118481),map:r?r.map:null,emissive:new a.Color(43263),emissiveIntensity:2,roughness:.2}),r&&r.dispose(),this.screenMesh=e,this.screenMesh.geometry.computeBoundingBox(),this.screenMesh.castShadow=!0,this.screenMesh.receiveShadow=!0}_initLights(){this.neonBlueLight=new a.SpotLight(43263,15,5,Math.PI/5,.4,1),this.neonBlueLight.castShadow=!0,this.neonBlueLight.shadow.mapSize.set(1024,1024),this.neonBlueLight.shadow.bias=-.001,this.customNeonTarget=new a.Object3D,this.sceneManager.add(this.customNeonTarget),this.neonBlueLight.target=this.customNeonTarget,this.sceneManager.add(this.neonBlueLight),this.topLight=new a.DirectionalLight(0xffe6b3,2.5),this.topLight.castShadow=!0,this.topLight.shadow.mapSize.set(1024,1024),this.topLight.shadow.bias=-5e-4;let e=o.LIGHT_CONFIG.directional.boxSize,r=this.topLight.shadow.camera;r.left=-e,r.right=e,r.top=e,r.bottom=-e,r.near=1,r.far=15,this.lightTarget=new a.Object3D,this.sceneManager.add(this.lightTarget),this.topLight.target=this.lightTarget,this.sceneManager.add(this.topLight)}alignLightsToModel(){if(!this.topLight||!this.lightTarget||!this.officeScene||!this.screenMesh)return;this.officeScene.updateMatrixWorld(!0),this.officeScene.getWorldPosition(this._vModelPos),this.screenMesh.geometry.boundingBox.getCenter(this._vLocalCenter),this._vRealScreenPos.copy(this._vLocalCenter),this.screenMesh.localToWorld(this._vRealScreenPos);let e=this._vModelPos.y+o.LIGHT_CONFIG.screenHeightOffset;this.neonBlueLight.position.set(this._vRealScreenPos.x,e,this._vRealScreenPos.z+.1),this.customNeonTarget.position.set(this._vRealScreenPos.x+o.LIGHT_CONFIG.targetXOffset,e,this._vRealScreenPos.z+o.LIGHT_CONFIG.targetZOffset),this.lightTarget.position.copy(this._vModelPos),this.topLight.position.set(this._vModelPos.x+o.LIGHT_CONFIG.directional.x,this._vModelPos.y+o.LIGHT_CONFIG.directional.y,this._vModelPos.z+o.LIGHT_CONFIG.directional.z),this.topLight.shadow.camera.updateProjectionMatrix()}}},{three:"hZcQL","../../../../config/heroDioram":"6FHkF","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],cWPjH:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"FrogCharacter",()=>c);var a=e("three"),o=e("../core/animationManager"),n=e("../infrastructure/three/diorama/dioramaManager");let l=new a.Vector3;class c{constructor(e,r,t){this.container=new a.Group,this.container.name="frogContainer",this.rawModel=e.scene||e,this.camera=r,this.triggerConfig=t,this.currentZoneId=null,this.animationManager=null,this.dioramaManager=null,this._init(e.animations||[])}_init(e){this.container.add(this.rawModel),this._optimizeMaterialsForDiorama(),this.animationManager=new(0,o.AnimationManager)(this.rawModel,e),this.dioramaManager=new(0,n.DioramaManager)(this),this.setVisibility(!0)}_optimizeMaterialsForDiorama(){this.rawModel.traverse(e=>{e.isMesh&&e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>{e.color&&e.color.multiplyScalar(.3),"roughness"in e&&(e.roughness=.85)})})}setupScene(e,r){e&&this.container.position.set(...e),void 0!==r&&this.container.quaternion.setFromAxisAngle(new a.Vector3(0,1,0),r)}setVisibility(e){this.container.visible=e}update(e){if(this.animationManager&&this.animationManager.update(e),this.dioramaManager&&this.dioramaManager.currentDiorama){let r=this.dioramaManager.currentDiorama;"function"==typeof r.update&&r.update(e)}this._checkTriggers()}_checkTriggers(){if(!this.camera?.position||!this.triggerConfig)return;let e=this.camera.position,r=null;for(let t of this.triggerConfig){let[i,s,a]=t.position;if(l.set(i,s,a),e.distanceToSquared(l)<=t.radius*t.radius){r=t;break}}this.currentZoneId!==r?.id&&(this.currentZoneId=r?r.id:null,r?(this.dioramaManager.switchDiorama(r.command),this.setVisibility(!0)):(this.setVisibility(!1),this.dioramaManager.clear()))}dispose(e=null){this.dioramaManager&&(this.dioramaManager.clear(),this.dioramaManager=null),this.animationManager&&(this.animationManager.dispose(),this.animationManager=null),e&&this.container&&e.remove(this.container),this.camera=null,this.triggerConfig=null}}},{three:"hZcQL","../core/animationManager":"23fAa","../infrastructure/three/diorama/dioramaManager":"3bmuv","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"23fAa":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"AnimationManager",()=>n);var a=e("three"),o=e("./errors/error");class n{constructor(e,r){if(!e)throw new(0,o.ValidationError)("AnimationManager","Initialization failed: 'model' target parameter is missing or undefined.");if(!r)throw new(0,o.ValidationError)("AnimationManager","Initialization failed: 'animations' array is undefined.");this.mixer=new a.AnimationMixer(e),this.actions=new Map,this.currentAction=null,this._init(r)}_init(e){0!==e.length&&e.forEach(e=>{let r=this.mixer.clipAction(e);this.actions.set(e.name,r)})}play(e,r=.5){let{name:t,loop:i,repeat:s,timeScale:n}=e,l=this.actions.get(t);if(!l)throw new(0,o.ValidationError)("AnimationManager",`Animation "${t}" does not exist on this model.`);return this.currentAction===l||(l.reset(),l.setEffectiveTimeScale(void 0!==n?n:1),l.setEffectiveWeight(1),l.clampWhenFinished=!0,s&&i?l.setLoop(a.LoopRepeat,s):i?l.setLoop(a.LoopRepeat):l.setLoop(a.LoopOnce),this.currentAction?(l.play(),this.currentAction.crossFadeTo(l,r,!1)):(l.play(),this.mixer.update(0)),this.currentAction=l),l}stop(e=.2){this.currentAction&&(e>0?this.currentAction.fadeOut(e):this.currentAction.stop(),this.currentAction=null)}update(e){this.mixer&&e>0&&this.mixer.update(e)}dispose(){this.mixer&&(this.mixer.stopAllAction(),this.mixer.uncacheRoot(this.mixer.getRoot())),this.actions.clear(),this.currentAction=null,this.mixer=null}}},{three:"hZcQL","./errors/error":"kY7rx","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"3bmuv":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"DioramaManager",()=>l);var a=e("./hero/heroDiorama"),o=e("../diorama/hero/frogCommands"),n=e("../../../core/errors/error");class l{constructor(e){if(!e||"object"!=typeof e)throw new(0,n.ValidationError)("DioramaManager","Initialization failed: Required parameter 'frog' instance is missing or invalid.");this.frog=e,this.currentDiorama=null,this.currentAction=null,this.dioramaMap={SIT_AND_TYPE:a.HeroDiorama}}switchDiorama(e=""){if(!e)return void this.clear();if(this.currentDiorama&&this.currentAction===e)return;this.currentDiorama&&(this.currentDiorama.exit(),this.currentDiorama=null),this.currentAction=e;let r=this.dioramaMap[e],t=o.FrogCommands?o.FrogCommands[e]:null;r&&t?(this.currentDiorama=new r(this.frog,t),this.currentDiorama.enter()):(this.currentDiorama=null,this.currentAction=null)}clear(){this.currentDiorama&&(this.currentDiorama.exit(),this.currentDiorama=null),this.currentAction=null}}},{"./hero/heroDiorama":"7t8iq","../diorama/hero/frogCommands":"cBjb2","../../../core/errors/error":"kY7rx","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"7t8iq":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"HeroDiorama",()=>c);var a=e("../baseDiorama"),o=e("./interruptPool"),n=e("../../../../core/errors/error"),l=e("../../../../core/errors/errorReport");class c extends a.BaseDiorama{constructor(e,r){super(e,r),this.poolIndex=0,this.activeSequence=[],this.sequenceIndex=0,this.onFinishedBound=this._onFinished.bind(this)}enter(){this.frog.animationManager.mixer.addEventListener("finished",this.onFinishedBound),this._startNewSequence()}_startNewSequence(){let e=o.INTERRUPT_POOL[this.poolIndex];if(!e||0===e.length){let e=new(0,n.ValidationError)("HeroDiorama",`INTERRUPT_POOL at index [${this.poolIndex}] is empty, undefined, or corrupted.`);l.ErrorReport.handle(e);return}this.activeSequence=JSON.parse(JSON.stringify(e)),this.sequenceIndex=0,this.poolIndex=(this.poolIndex+1)%o.INTERRUPT_POOL.length,this._playCurrentStep()}_playCurrentStep(){let e=this.activeSequence[this.sequenceIndex];e?this.frog.animationManager.play(e,.3):this._startNewSequence()}_onFinished(e){let r=this.activeSequence[this.sequenceIndex];if(!r)return;let t=this.frog.animationManager.actions.get(r.name);e.action===t&&(this.sequenceIndex<this.activeSequence.length-1?(this.sequenceIndex++,this._playCurrentStep()):this._startNewSequence())}exit(){this.frog.animationManager.mixer.removeEventListener("finished",this.onFinishedBound),this.frog.animationManager&&this.frog.animationManager.stop(0),this.activeSequence=[],this.sequenceIndex=0}}},{"../baseDiorama":"3Jer5","./interruptPool":"d1qZw","../../../../core/errors/error":"kY7rx","../../../../core/errors/errorReport":"48JUx","@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],"3Jer5":[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"BaseDiorama",()=>a);class a{constructor(e,r){if(new.target===a)throw TypeError("Cannot directly instantiate abstract class BaseDiorama.");this.frog=e,this.config=r}enter(){throw Error("Method 'enter()' must be implemented in the subclass.")}exit(){}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],d1qZw:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"INTERRUPT_POOL",()=>a);let a=[[{name:"typing",loop:!0,repeat:3,timeScale:.6},{name:"praying",loop:!0,repeat:3,timeScale:1},{name:"standing_victory",loop:!1,timeScale:1}],[{name:"typing",loop:!0,repeat:3,timeScale:.6},{name:"sitting_pose",loop:!0,repeat:5,timeScale:1},{name:"sitting_victory",loop:!1,timeScale:1}],[{name:"typing",loop:!0,repeat:3,timeScale:.6},{name:"sitting_pose",loop:!0,repeat:5,timeScale:1},{name:"typing",loop:!0,repeat:2,timeScale:.6},{name:"praying",loop:!0,repeat:3,timeScale:1},{name:"sitting_victory2",loop:!1,timeScale:1}]]},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],cBjb2:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"FrogCommands",()=>a);let a={SIT_AND_TYPE:{sequence:[{name:"typing",loop:!0}],position:[10,0,-25],rotationY:-Math.PI/1.7}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}],d9rWC:[function(e,r,t,i){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(t),s.export(t,"FROG_TRIGGER_CONFIG",()=>a);let a=[{id:"main_zone",position:[-5,4,-10],radius:23,command:"SIT_AND_TYPE"}]},{"@parcel/transformer-js/src/esmodule-helpers.js":"91HVb"}]},[],"parcelRequire2041",{});
//# sourceMappingURL=world.ee270403.js.map
