import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";

//const gui = new dat.GUI();

const canvas = document.querySelector("#webgl");
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);
camera.position.z = 6;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const donutParticleGeometry = new THREE.TorusGeometry(2.8, 0.7, 16, 100);
const donutParticleMaterial = new THREE.PointsMaterial({
  size: 0.023,
  color: "#59cce8",
});
const donutParticles = new THREE.Points(
  donutParticleGeometry,
  donutParticleMaterial
);
scene.add(donutParticles);

//gui.addColor(donutParticleMaterial, "color");

const count = 3000;
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 15;
}
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  size: 0.01,
});
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  camera.position.x = Math.cos(elapsedTime / 2) * 6;
  camera.position.z = Math.sin(elapsedTime / 2) * 6;

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
