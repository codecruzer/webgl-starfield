var STARFIELD = STARFIELD || {};

STARFIELD.create = function (_scene, _width, _height, _depth, _vertexShader, _fragmentShader)
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
			resize: resize,
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
			depth: {
				type: "f",
				value: _depth
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
				vertexShader:   _vertexShader,
				fragmentShader: _fragmentShader,
				blending: 		THREE.AdditiveBlending,
				depthTest: 		false,
				transparent:	true
			}
		);
		
		// Create new star particles
		var geometry = new THREE.Geometry();
		var vertices = geometry.vertices;
		for (var i = 0; i < _SPAWN_AMOUNT; ++i)
		{
			vertices.push(
				new THREE.Vector3(
					Math.random(),
					Math.random(),
					_depth * Math.random()
				)
			);
		}

		// Create new star ParticleSystem
		var particleSystem = new THREE.ParticleSystem(geometry, _material);
		particleSystem.dynamic = true;
		particleSystem.position.z = _depth * -1;
		_particleSystems.push(particleSystem);

		resize(_width, _height);

		if (_scene)
		{
			_scene.add(particleSystem);
		}
	}

	var resize = function (width, height)
	{
		_width = width;
		_height = height;

		if (_particleSystems)
		{
			for (var i = _particleSystems.length - 1; i > -1; --i)
			{
				var particleSystem = _particleSystems[i];
				particleSystem.position.x = _width * -0.5;
				particleSystem.position.y = _height * -0.5;
				particleSystem.scale.x = _width;
				particleSystem.scale.y = _height;
			}
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