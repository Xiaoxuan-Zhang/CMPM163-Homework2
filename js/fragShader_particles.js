var fragShader_particles = `
    precision highp float;

    uniform vec2 resolution;
    uniform float iGlobalTime;
    uniform vec3 particle_color1;
    uniform vec3 particle_color2;

    varying vec2 fragCoord;

    #define Resolution				resolution
    #define Time					iGlobalTime

    #define HorizontalAmplitude		0.30
    #define VerticleAmplitude		0.20
    #define HorizontalSpeed			0.90
    #define VerticleSpeed			1.50
    #define ParticleMinSize			1.76
    #define ParticleMaxSize			1.61
    #define ParticleBreathingSpeed		0.30
    #define ParticleColorChangeSpeed	0.70
    #define ParticleCount			2.0
    #define ParticleColor1			particle_color1* 255.0 //vec3(9.0, 5.0, 3.0)
    #define ParticleColor2			particle_color2* 255.0 //vec3(1.0, 3.0, 9.0)


    float hash( float x )
    {
        return fract( cos( x ) * 43758.5453 );
    }

    float noise( vec2 uv )  // Thanks Inigo Quilez
    {
        vec3 x = vec3( uv.xy, 0.0 );

        vec3 p = floor( x );
        vec3 f = fract( x );

        f = f*f*(3.0 - 2.0*f);

        float offset = 57.0;

        float n = dot( p, vec3(1.0, offset, offset*2.0) );

        return mix(	mix(	mix( hash( n + 0.0 ), 		hash( n + 1.0 ), f.x ),
                    mix( hash( n + offset), 	hash( n + offset+1.0), f.x ), f.y ),
            mix(	mix( hash( n + offset*2.0), hash( n + offset*2.0+1.0), f.x),
                          mix( hash( n + offset*3.0), hash( n + offset*3.0+1.0), f.x), f.y), f.z);
    }

    float snoise( vec2 uv )
    {
        return noise( uv ) * 2.0 - 1.0;
    }


    float perlinNoise( vec2 uv )
    {
        float n = 		noise( uv * 1.0 ) 	* 128.0 +
                noise( uv * 2.0 ) 	* 64.0 +
                noise( uv * 4.0 ) 	* 32.0 +
                noise( uv * 8.0 ) 	* 16.0 +
                noise( uv * 16.0 ) 	* 8.0 +
                noise( uv * 32.0 ) 	* 4.0 +
                noise( uv * 64.0 ) 	* 2.0 +
                noise( uv * 128.0 ) * 1.0;

        float noiseVal = n / ( 1.0 + 2.0 + 4.0 + 8.0 + 16.0 + 32.0 + 64.0 + 128.0 );
        noiseVal = abs(noiseVal * 2.0 - 1.0);

        return 	noiseVal;
    }

    float fBm( vec2 uv, float lacunarity, float gain )
    {
        float sum = 0.0;
        float amp = 10.0;

        for( int i = 0; i < 2; ++i )
        {
            sum += ( perlinNoise( uv ) ) * amp;
            amp *= gain;
            uv *= lacunarity;
        }

        return sum;
    }

    vec3 particles( vec2 pos )
    {

      vec3 c = vec3( 0, 0, 0 );

      float noiseFactor = fBm( pos, 0.01, 0.1);

      for( float i = 1.0; i < ParticleCount+1.0; ++i )
      {
        float cs = cos( Time * HorizontalSpeed * (i/ParticleCount) + noiseFactor ) * HorizontalAmplitude;
        float ss = sin( Time * VerticleSpeed   * (i/ParticleCount) + noiseFactor ) * VerticleAmplitude;
        vec2 origin = vec2( cs , ss );

        float t = sin( Time * ParticleBreathingSpeed * i ) * 0.5 + 0.5;
        float particleSize = mix( ParticleMinSize, ParticleMaxSize, t );
        float d = clamp( sin( length( pos - origin )  + particleSize ), 0.0, particleSize);

        float t2 = sin( Time * ParticleColorChangeSpeed * i ) * 0.5 + 0.5;
        vec3 color = mix( ParticleColor1, ParticleColor2, t2 ) ;
        color = mix(color, vec3(0.0,0.0,0.0), 0.5);
        c += color * pow( d * 0.7, 10.0 );
      }

      return c;
    }

    void main()
    {

      vec2 uv = fragCoord.xy*0.2;


      vec3 finalColor = particles( uv );
      finalColor = mix(vec3(0.0,0.0,0.0), finalColor, 0.2);

      gl_FragColor = vec4( finalColor, 1.0 );
    }
`;
