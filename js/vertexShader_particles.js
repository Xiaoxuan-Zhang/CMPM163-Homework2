var vertexShader_particles = `
    precision highp float;
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;

    //Since we are using a plain BufferGeometry, we have defined all of our attributes manually
    attribute vec3 position;
    varying vec2 fragCoord;

    void main() {
      vec4 Position = viewMatrix * modelMatrix * vec4(position, 1.0);
      fragCoord = position.xy;
      gl_Position = projectionMatrix * Position;
    }
`;
