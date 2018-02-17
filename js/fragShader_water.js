var fragShader_water = `
precision mediump float;
uniform sampler2D tWater;

varying vec2 vUv;
varying float vDisplace;


void main() {

vec4 water = texture2D(tWater, vUv);
float zOffset = vDisplace;
gl_FragColor = vec4( water.rgb, 1.0 );

}
`;
