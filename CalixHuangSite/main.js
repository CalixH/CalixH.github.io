import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import { RGBAFormat } from 'three';


// Setup
var t = 0;

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

const plane2 = new THREE.Mesh(planeG, material);
plane2.rotation.y = -110;
plane2.rotation.z = -100;
plane2.position.x = 700;
plane2.position.z = 200;
scene.add(plane2);

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
const cax = new THREE.Mesh(new THREE.PlaneGeometry(3.75,5), new THREE.MeshBasicMaterial({map: caxTexture}));
cax.rotateZ(-0.2);
cax.rotateY(-0.3);
cax.position.x = 3;
cax.position.z = 5;
cax.position.y = -0.3;
scene.add(cax);

// Uni
const uwTexture = new THREE.TextureLoader().load('uw.png');
const uw = new THREE.Mesh(new THREE.CircleGeometry(5.4), new THREE.MeshBasicMaterial({map: uwTexture, side: THREE.DoubleSide}));
uw.position.x = 14;
uw.position.z = 16;
uw.position.y = -3;
scene.add(uw);

const geometry2 = new THREE.TorusKnotGeometry( 1.6, 0.6, 100, 16,1 ,3 );
const torusKnot = new THREE.Mesh( geometry2, material );
torusKnot.rotateX(-0.7);

scene.add(torusKnot);

// video
let video = document.getElementById("video");

let videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

var movieMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side : THREE.FrontSide,
  toneMapped: false,
});

const orange = new THREE.Mesh(
  new THREE.PlaneGeometry(72,128),
  movieMaterial
);

// orange.position.z = -80;
// orange.position.x = 400;
// orange.position.y = 100;
orange.rotation.y = -2;
orange.rotation.z = 2.167;
orange.rotation.x = 3;

scene.add(orange);

torusKnot.position.z = -5;
torusKnot.position.x = 2;


// Scroll Animation

function moveCamera() {
  t = document.body.getBoundingClientRect().top;
  //<p id="demo"></p>  for html
  //document.getElementById("demo").innerHTML = t;
  uw.rotation.x += 0.03;
  uw.rotation.y += 0.02;

  orange.position.y = -500 - t * 0.1;
  orange.position.x = 210 + t * 0.02;
  orange.position.z = 80 + t * 0.02;

  camera.position.x = t * -0.0002;
  camera.position.z = t * -0.01;
  camera.rotation.y = t * 0.0002;
  if (t > -4000) {
    camera.rotation.z = t * 0.0002;
  } else if (t <= -4000 && t > -9000){
    camera.rotation.z = -0.8;
  } else {
    camera.rotation.z = -0.8 - (t + 9000) * 0.0002
  }
  //document.getElementById("demo").innerHTML = camera.rotation.z;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  
  uw.rotation.x += 0.01;
  uw.rotation.y += 0.009;

  torusKnot.rotation.z += 0.01;
  // controls.update();
  videoTexture.needsUpdate = true;

  renderer.render(scene, camera);
}

animate();