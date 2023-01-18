import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';


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

const geometry = new THREE.TorusGeometry(10, 3, 16, 100, 4.7);
const material = new THREE.MeshNormalMaterial({color: 0xff0000, wireframe: true, });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const amb = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(amb);

const pLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(pLight);

const planeG = new THREE.PlaneGeometry(10000, 10000, 1000, 1000);
const plane = new THREE.Mesh(planeG, material);
plane.rotation.y = -100;
plane.rotation.z = -100;
scene.add(plane);

// const controls = new OrbitControls(camera, renderer.domElement);

// Text
const loader = new FontLoader();

loader.load('./fonts/TR2N_Regular.json', function (font) {
  const geometry = new TextGeometry('Calix \n Huang', {
    font: font, size: 0.4, height: 0.1,
  })
  const textmesh = new THREE.Mesh(geometry, 
    new THREE.MeshNormalMaterial({color: 0xad4000}));

  scene.add(textmesh);
  textmesh.position.x = -1.4;
  textmesh.position.z = -1.5;
  textmesh.position.y = 0.2;
})


function addStar() {
  const a = THREE.MathUtils.randFloat(3, 11);

  const geometry = new THREE.BoxGeometry(a, a, a);
  const edges = new THREE.EdgesGeometry(geometry);
  const star = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(800));

  star.position.set(x, y, z);
  star.rotateX(x);
  star.rotateY(y);
  star.rotateZ(z);
  scene.add(star);

  // circle
  const b = THREE.MathUtils.randFloat(1, 4);
  const c = THREE.MathUtils.randFloat(2, 6.28);
  const sphere = new THREE.SphereGeometry(b, 26, 14, 0, 6.28, c, 3.14);
  const circle = new THREE.Mesh(sphere, material);

  const [d, e, f] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(800));

  circle.position.set(d,e,f);
  circle.rotateX(x);
  circle.rotateY(y);
  circle.rotateZ(z);
  scene.add(circle);

}

Array(350).fill().forEach(addStar);

// Background

scene.background = new THREE.Color(0x000000);

// Avatar

const caxTexture = new THREE.TextureLoader().load('CalixHuang.JPG');
const cax = new THREE.Mesh(new THREE.PlaneGeometry(5,5), new THREE.MeshBasicMaterial({map: caxTexture}));
cax.rotateZ(-0.2);
cax.rotateY(-0.3);
cax.position.x = 3;
cax.position.z = 5;
cax.position.y = -0.3;
scene.add(cax);

const geometry2 = new THREE.TorusKnotGeometry( 1.6, 0.6, 100, 16,1 ,3 );
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
  camera.rotation.y = t * 0.0002;
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