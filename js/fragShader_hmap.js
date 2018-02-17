var fragShader_hmap = `
precision mediump float;
uniform sampler2D tRock;
uniform sampler2D tSnow;

varying vec2 vUv;
varying float vDisplace;


void main() {

vec4 rock = texture2D(tRock, vUv);
vec4 snow = texture2D(tSnow, vUv);

float zOffset = vDisplace;

vec4 mix1 = mix(rock, vec4(0.15,0.1,0.16,0.8) , 0.4);
vec4 mix2 = mix(mix1, snow, -zOffset/2.0);
gl_FragColor = vec4(mix2.rgb, 1.0);

}`;
