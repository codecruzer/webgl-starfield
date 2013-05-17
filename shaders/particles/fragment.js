uniform vec3 color;
uniform sampler2D texture;

varying vec3 vColor;

void main()
{
	gl_FragColor = vec4(color, 1.0);
	gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
}