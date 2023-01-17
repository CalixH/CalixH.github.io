import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
			import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';


// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0x909090, roughness: 0, metalness: 0.7});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights



const light = new THREE.HemisphereLight( 0xfffff, 0x000000 );
scene.add( light );

const amb = new THREE.AmbientLight(0xffffff);
scene.add(amb);

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

RectAreaLightUniformsLib.init();

				const rectLight1 = new THREE.RectAreaLight( 0xffffff, 5, 4, 10 );
				rectLight1.position.set( - 5, 5, 5 );
				scene.add( rectLight1 );

				const rectLight2 = new THREE.RectAreaLight( 0xffffff, 5, 4, 10 );
				rectLight2.position.set( 0, 5, 5 );
				scene.add( rectLight2 );

				const rectLight3 = new THREE.RectAreaLight( 0xffffff, 5, 4, 10 );
				rectLight3.position.set( 5, 5, 5 );
				scene.add( rectLight3 );

				scene.add( new RectAreaLightHelper( rectLight1 ) );
				scene.add( new RectAreaLightHelper( rectLight2 ) );
				scene.add( new RectAreaLightHelper( rectLight3 ) );

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.TorusGeometry(0.4, 0.3, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0x949494 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  star.rotateX(x);
  star.rotateY(y);
  star.rotateZ(z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const geometry2 = new THREE.TorusKnotGeometry( 1.6, 0.6, 100, 16,4 ,3 );
const torusKnot = new THREE.Mesh( geometry2, material );
torusKnot.rotateX(-0.7);

scene.add(torusKnot);

// orange

const orangeTexture = new THREE.TextureLoader().load('orange.jpg');

const orange = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: orangeTexture
  })
);

scene.add(orange);

orange.position.z = 30;
orange.position.setX(-10);

torusKnot.position.z = -5;
torusKnot.position.x = 2;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  orange.rotation.x += 0.05;
  orange.rotation.y += 0.075;
  orange.rotation.z += 0.05;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  camera.rotation.z = t * 0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  orange.rotation.x += 0.005;

  torusKnot.rotation.z += 0.01;
  // controls.update();

  renderer.render(scene, camera);
}

animate();