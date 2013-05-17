var STARFIELD = STARFIELD || {};

STARFIELD.create = function (scene, vertexShader, fragmentShader)
{
	var _SPAWN_AMOUNT = 100000;

	var _elapsedTime = 0;

	var _uniforms;
	var _material;
	var _particleSystems = [];

	var ctor = function() 
	{
		spawnStars();

		return {
			spawnStars: spawnStars,
			tick: tick,
			getStarCount: getStarCount
		};
	}

	var spawnStars = function ()
	{
		_uniforms = _uniforms || {
			elapsedTime: {
				type: "f",
				value: 1.0
			},
			color: {
				type: "c",
				value: new THREE.Color(0xFFFFFF)
			},
			texture: {
				type: "t",
				value: THREE.ImageUtils.loadTexture("assets/star.png")
			}
		};

		_material = _material || new THREE.ShaderMaterial(
			{
				uniforms: 		_uniforms,
				vertexShader:   vertexShader,
				fragmentShader: fragmentShader,
				blending: 		THREE.AdditiveBlending,
				depthTest: 		false,
				transparent:	true
			}
		);
		
		// Create new stars
		var geometry = new THREE.Geometry();
		var vertices = geometry.vertices;
		for (var i = 0; i < _SPAWN_AMOUNT; ++i)
		{
			vertices.push(
				new THREE.Vector3(
					APP.screenW * Math.random(),
					APP.screenH * Math.random(),
					APP.maxDistance * Math.random()
				)
			);
		}

		var particleSystem = new THREE.ParticleSystem(geometry, _material);
		particleSystem.dynamic = true;
		particleSystem.position.x = APP.screenW * -0.5;
		particleSystem.position.y = APP.screenH * -0.5;
		particleSystem.position.z = APP.maxDistance * -1;

		_particleSystems.push(particleSystem);

		if (scene)
		{
			scene.add(particleSystem);
		}
	}

	var tick = function (delta)
	{
		_elapsedTime += delta;

		if (_uniforms)
		{
			_uniforms.elapsedTime.value = _elapsedTime;
		}
	}

	var getStarCount = function ()
	{
		var count = 0;

		if (_particleSystems)
		{
			for (var i = _particleSystems.length - 1; i > -1; --i)
			{
				count += _particleSystems[i].geometry.vertices.length;
			}
		}

		return count;
	}

	return ctor();
}