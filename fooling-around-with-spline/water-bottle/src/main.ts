import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import './style.css'
import three, { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Camera } from "three"

const scene = new Scene()
let camera: Camera = new PerspectiveCamera(120, 1920 / 1080, 0.1, 1000)

const renderer = new WebGLRenderer()
renderer.setSize(1920, 1080)
document.body.appendChild(renderer.domElement)

// const geometry = new BoxGeometry(1, 1, 1)
// const material = new MeshBasicMaterial({ color: 0x00ff00 })
// scene.add(cube)

// const cube = new Mesh(geometry, material)
// camera.position.z = 5

// camera.position.x = 1938.35
// camera.position.y = -554.53
// camera.position.z = 517.46
//
// camera.rotation.x = -118.77
// camera.rotation.y = 85.07
// camera.rotation.z = 118.86
//
// camera.scale.x = 1
// camera.scale.y = 1
// camera.scale.z = 2.73

const loader = new GLTFLoader()
loader.load("/media/models/bottle.glb", (gltf) => {
  camera = gltf.cameras.find(camera => camera.name === 'view')!
  gltf.scene.children.forEach(child => {
    console.log(child)
    scene.add(child)
  })
}, undefined, (err) => console.warn(err))

renderer.setAnimationLoop(() => {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
});
