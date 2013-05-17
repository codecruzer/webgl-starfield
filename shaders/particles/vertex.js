uniform float elapsedTime;
uniform float depth;

const float F_VELOCITY = 100.0;
const float F_MIN_SIZE = 5.0;
const float F_MAX_SIZE = 25.0;

void main()
{
	vec4 pos = vec4(position, 1.0);
	pos.z += mod(F_VELOCITY * elapsedTime, depth);

	vec4 mvPosition = modelViewMatrix * pos;

	gl_PointSize = mix(F_MAX_SIZE, F_MIN_SIZE, depth / pos.z);

	gl_Position = projectionMatrix * mvPosition;
}