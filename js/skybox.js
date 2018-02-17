function createSkyBox()
{
  var cubeMap = new THREE.CubeTextureLoader()
    .setPath("./pic/ame_cotton/")
    .load( [
      'posx.png',
      'negx.png',
      'posy.png',
      'negy.png',
      'posz.png',
      'negz.png'
    ] );

		cubeMap.format = THREE.RGBFormat;

    var uniforms = { "tCube": { type: "t", value: cubeMap } };

    var material = new THREE.RawShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexShader_skybox,
        fragmentShader: fragShader_skybox,
        depthWrite: false,
    		side: THREE.BackSide,
      } );

    var geometry = new THREE.BoxGeometry( 1000, 1000, 1000 );

    var skybox = new THREE.Mesh( geometry, material );

    return skybox;
  }
