var APP = APP || {};

// App properties
APP.screenW = window.innerWidth;
APP.screenH = window.innerHeight;
APP.stats;
APP.clock;

// Scene properties
APP.maxDistance = 1000.0;
APP.fov = 75;
APP.clipNear = 0.1;
APP.clipFar = APP.maxDistance;
APP.scene;
APP.camera;
APP.renderer;
APP.shaders;

APP.material;


APP.starfield;

APP.init = function ()
{
	if (!Detector.webgl)
	{
		Detector.addGetWebGLMessage();
	}

	// Init scene
	APP.scene = APP.scene || new THREE.Scene();

	if (!APP.camera)
	{
		APP.camera = new THREE.PerspectiveCamera(APP.fov, APP.getAspectRatio(), APP.clipNear, APP.clipFar);
		APP.camera.position.z = (APP.maxDistance * 0.5);
	}

	if (!APP.renderer)
	{
		APP.renderer = new THREE.WebGLRenderer();
		APP.renderer.setSize(APP.screenW, APP.screenH);
		APP.renderer.setClearColor(0x000000, 1);
		document.body.appendChild(APP.renderer.domElement);
	}

	// Stats tracker used for metrics like FPS
	if (!APP.stats)
	{
		APP.stats = new Stats();
		APP.stats.domElement.style.position = "absolute";
		APP.stats.domElement.style.top = "0px";
		document.getElementById("stats").appendChild(APP.stats.domElement);
	}

	if (!APP.clock)
	{
		APP.clock = new THREE.Clock();
		APP.clock.start();
	}

	if (!APP.starfield)
	{
		APP.starfield = STARFIELD.create(
			APP.scene,
			APP.shaders.particles.vertex,
			APP.shaders.particles.fragment
		);
	}

	// Add event listeners
	addEventListener('click', APP.onClick);

	//document.getElementById("info").innerHTML += "</br>Stars: " + APP.starfield.getStarCount();

	APP.render();
}

APP.render = function ()
{
	requestAnimationFrame(APP.render);

	APP.tick();
	
	APP.renderer.render(APP.scene, APP.camera);
}

APP.tick = function ()
{
	var delta = APP.clock.getDelta();

	APP.starfield.tick(delta);

	APP.stats.update();
}

APP.getAspectRatio = function ()
{
	return (APP.screenH == 0) ? 0.0 : APP.screenW / APP.screenH;
}

APP.onClick = function ()
{
	APP.starfield.spawnStars();

	//document.getElementById("info").innerHTML = "Stars: " + APP.starfield.getStarCount();
}

APP.onResize = function ()
{
	APP.starfield.onResize();
}

APP.loadShaders = function ()
{
	SHADER_LOADER.load(APP.onShadersLoaded);
}

APP.onShadersLoaded = function (shaders)
{
	APP.shaders = shaders;
	APP.init();
}

$(document).ready(APP.loadShaders);