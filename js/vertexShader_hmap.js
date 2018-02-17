var vertexShader_hmap = `
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform sampler2D tHmap;
uniform sampler2D tRock;
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform float displaceAmt; //controls the amount of vertex displacement...
uniform float displaceOffset;

varying float vDisplace;
varying vec2 vUv;

precision mediump float;


void main() {

  vUv = uv;
  vec4 clr = texture2D(tHmap, uv);

  //vDisplace = (3.0 - (clr.r + clr.g + clr.b)) * displaceAmt; //displacement;
  vDisplace = -(clr.r + clr.g + clr.b) * displaceAmt;
  vec3 newPosition = position.xyz + normal.xyz * vDisplace;

  gl_Position = projectionMatrix  * viewMatrix * modelMatrix  * vec4( newPosition, 1.0 );
}`;
