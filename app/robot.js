import { configDotenv } from 'dotenv';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


//the 3d space
const scene = new THREE.Scene();
//the point of view
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let object;

let objToRender = 'humanoid_robot'

const loader = new GLTFLoader();

loader.load(
    `src/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total *100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

const controls = new OrbitControls( camera, renderer.domElement );

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("container3D").appendChild( renderer.domElement );

camera.position.z = objToRender === "humanoid_robot" ? 25 : 500;

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === 'humanoid_robot' ? 5 : 1);



function animate() {
    requestAnimationFrame(animate);
    if (object && objToRender === 'humanoid_robot') {
        object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;

    }
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

animate();