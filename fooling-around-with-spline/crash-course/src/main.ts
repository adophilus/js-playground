import * as three from "three";

const scene = new three.Scene();

const geometry = new three.SphereGeometry(3, 64, 64);
const material = new three.MeshStandardMaterial({
	color: "#00ff83",
	roughness: 1,
	metalness: 0,
});
// const material = new three.MeshBasicMaterial({
// 	color: "#00ff83",
// });

const mesh = new three.Mesh(geometry, material);
scene.add(mesh);

const light = new three.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

const camera = new three.PerspectiveCamera(75, 800 / 600);
camera.position.z = 20;

document.addEventListener("DOMContentLoaded", () => {
	const renderer = new three.WebGLRenderer({
		antialias: true,
	});
	renderer.setSize(800, 600);
	document.body.appendChild(renderer.domElement);
	renderer.setAnimationLoop(() => {
		renderer.render(scene, camera);
	});
});
