var STAR = STAR || {};

STAR.create = function (x, y, z, scale, velocity)
{
	var _x;
	var _y;
	var _z;
	var _scale;
	var _vertex;
	var _velocity;
	
	var ctor = function ()
	{
		_x = x || 0;
		_y = y || 0;
		_z = z || 0;

		_scale = scale || 1.0;

		_velocity = velocity;

		_vertex = new THREE.Vector3(_x, _y, _z)

		return {
			tick: tick,
			getX: getX,
			setX: setX,
			getY: getY,
			setY: setY,
			getZ: getZ,
			setZ: setZ,
			getScale: getScale,
			getVelocity: getVelocity,
			setVelocity: setVelocity,
			getVertex: getVertex
		};
	}

	var tick = function (delta)
	{
		_z += _velocity * delta;

		if (_z >= APP.maxDistance)
		{
			_z = APP.maxDistance * -1;
		}

		_vertex.x = _x;
		_vertex.y = _y;
		_vertex.z = _z;
	}

	var getX = function ()
	{
		return _x;
	}

	var setX = function (value)
	{
		_x = val;
	}

	var getY = function ()
	{
		return _y;
	}

	var setY = function (value)
	{
		_y = val;
	}

	var getZ = function ()
	{
		return _z;
	}

	var setZ = function (value)
	{
		_z = val;
	}

	var getScale = function ()
	{
		return _scale;
	}

	var getVelocity = function ()
	{
		return _velocity.z;
	}

	var setVelocity = function (value)
	{
		_velocity = value;
	}

	var getVertex = function ()
	{
		return _vertex;
	}

	return ctor();
}