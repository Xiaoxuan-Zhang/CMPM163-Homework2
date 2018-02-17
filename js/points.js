function points(x_range, y_range, z_range){
  var amount = 500;
  var radius = 30;
  var max_size = 1.0;
  var texture = new THREE.TextureLoader().load('./pic/star/star.png');

  var positions = new Float32Array(amount * 3);
  var colors = new Float32Array(amount * 3);
  var vertex = new THREE.Vector3();
  var color = new THREE.Vector3(0.8,0.8,1.0);
  var sizes = new Float32Array(amount);

  for ( var i = 0; i < amount; i ++ ) {
    // vertex.x = Math.random() * x_range;
    // vertex.y = Math.random() * y_range;
    // vertex.z = Math.random() * z_range;

    vertex.x = ( Math.random() * 2 - 1 ) * radius;
    vertex.y = ( Math.random() * 2 - 1 ) * radius;
    vertex.z = ( Math.random() * 2 - 1 ) * radius;
    vertex.toArray(positions, i* 3);

    color.toArray( colors, i * 3 );
    sizes[i] =  max_size * (1.0 - Math.abs(vertex.y)/y_range) ;

  };

  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
  geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

  var material = new THREE.ShaderMaterial( {

    uniforms: {
      amplitude: { value: 1.0 },
      color:     { value: new THREE.Vector3(1.0,1.0,1.0) },
      texture:   { value: texture }
    },
    vertexShader:   vertexShader_points,
    fragmentShader: fragShader_points,
    blending:       THREE.AdditiveBlending,
    depthTest:      false,
    transparent:    true

  });

  points = new THREE.Points( geometry, material );

  return points;
};
