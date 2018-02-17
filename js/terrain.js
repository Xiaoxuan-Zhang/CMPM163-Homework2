// return terrain mesh
function CreateTerrain(width, height)
{
  var hmapTexture = new THREE.TextureLoader().load('./pic/fuji_zoomin_1.png');
  var terrainTexture = new THREE.TextureLoader().load('./pic/rock.png');
  var addonTexture = new THREE.TextureLoader().load('./pic/snow.jpg');

  // geometry
  var geometry = new THREE.PlaneGeometry( width, height, 100, 100 );

  // material
  var uniforms =  {
    displaceAmt: { type: "f", value: 0.8 },
    displaceOffset: { type: "f", value: -2.1 },
    tHmap: { type: "t", value: hmapTexture  },
    tRock: { type: "t", value: terrainTexture  },
    tSnow: { type: "t", value: addonTexture  },
  };

  var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader_hmap,
    fragmentShader: fragShader_hmap,
  } );

  terrain = new THREE.Mesh( geometry, material );
  terrain.material.side = THREE.BackSide;


  return terrain;
}
