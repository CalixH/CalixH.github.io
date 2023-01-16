import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(25);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100, 4.8);
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// me

const caxTexture = new THREE.TextureLoader().load('CalixHuang.JPG');

const cax = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: caxTexture})
);

scene.add(cax);

// orange

const orangeTexture = new THREE.TextureLoader().load('orange.jpg');

const orange = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: orangeTexture})
);

scene.add(orange);

orange.position.z = 30;
orange.position.x = -10;

cax.position.z = -5;
cax.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  orange.rotation.x += 0.05;
  orange.rotation.y += 0.075;
  orange.rotation.z += 0.05;

  cax.rotation.y += 0.01;
  cax.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.y = t * -0.0002;
  camera.position.x = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
