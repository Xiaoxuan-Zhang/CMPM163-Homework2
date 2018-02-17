var fragShaderFragCoord = `
precision highp float;

uniform vec2 resolution;

varying vec2 fragCoord;

void main()
{
  vec3 finalColor = vec3(fragCoord.x / resolution.x + 0.5, fragCoord.y / resolution.y + 0.5, 0.0);
  gl_FragColor = vec4( finalColor, 1.0 );
}
`;

var fragShaderSine = `
precision highp float;

uniform vec2 resolution;

varying vec2 fragCoord;

void main()
{
  vec3 finalColor = vec3(0.0, 0.0, 0.0);
  float normX = fragCoord.x / resolution.x * 2.0;
  float normY = fragCoord.y / resolution.y * 2.0;
  float threshold = 0.5;
  float delta = normY - sin(normX * 3.1416);

  if (abs(delta) <= threshold) {
    finalColor.g = threshold - abs(delta);
  }

  gl_FragColor = vec4( finalColor, 1.0 );
}
`;

var fragShaderSineTime = `
precision highp float;

uniform vec2 resolution;
uniform float time;

varying vec2 fragCoord;

void main()
{
  vec3 finalColor = vec3(0.0, 0.0, 0.0);
  float normX = fragCoord.x / resolution.x * 2.0;
  float normY = fragCoord.y / resolution.y * 2.0 * 2.0;
  float threshold = 0.05;
  float delta = normY - sin(normX * 3.1416);

  if (abs(delta) <= threshold) {
    finalColor.b = (threshold - abs(delta)) / threshold;
    finalColor.r = (threshold - abs(delta)) / threshold * abs(sin(time));
  }

  float secondThreshold = 1.0;
  float xDelta = abs(sin(time) - normX);
  float segmentLength = 0.1;
  if (abs(delta) <= secondThreshold && xDelta < segmentLength) {
    finalColor.g = (segmentLength - xDelta) / segmentLength * abs(cos(time)) * (threshold / 1.2 - abs(delta)) / threshold;
  }

  gl_FragColor = vec4( finalColor, 1.0 );
}
`;

var fragShaderSineTimeRotating = `
precision highp float;

uniform vec2 resolution;
uniform float time;

varying vec2 fragCoord;


float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main()
{
  vec3 finalColor = vec3(0.0, 0.0, 0.0);
  float r = length(fragCoord);
  float angle = atan(fragCoord.x / fragCoord.y) + time * 2.0;
  vec2 newCoord = vec2(sin(angle) * r, cos(angle) * r);
  float normX = newCoord.x / resolution.x * 2.0;
  float normY = newCoord.y / resolution.y * 2.0 * 2.0;
  float threshold = 0.05;
  float delta = normY - sin(normX * 3.1416);

  if (abs(delta) <= threshold) {
    finalColor.b = (threshold - abs(delta)) / threshold;
    finalColor.r = (threshold - abs(delta)) / threshold * abs(sin(time));
  }

  float secondThreshold = 1.0;
  float xDelta = abs(sin(time) - normX);
  float segmentLength = 0.1;
  if (abs(delta) <= secondThreshold && xDelta < segmentLength) {
    finalColor.g = (segmentLength - xDelta) / segmentLength * abs(cos(time)) * (threshold / 1.2 - abs(delta)) / threshold;
  }

  gl_FragColor = vec4( finalColor, 1.0 );
}
`;
