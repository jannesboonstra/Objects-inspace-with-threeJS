
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
const renderer =  new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize (window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);

// const Lighthelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(Lighthelper, gridHelper);

function addStar(){
    const geometry = new THREE.SphereGeometry(.25, 24,24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
    const star =  new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const selfieTexture = new THREE.TextureLoader().load('selfie.jpg');
const selfie = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: selfieTexture})
);
scene.add(selfie);

const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const earthNormalTexture = new THREE.TextureLoader().load('normalEarth.png')
const earth = new THREE.Mesh(
    new THREE.SphereBufferGeometry(3,32,32),
    new THREE.MeshStandardMaterial({map: earthTexture, normal: earthNormalTexture})
)

scene.add(earth);

earth.position.z=30;
earth.position.setX(-10);

function moveCamera(){

    const t = document.body.getBoundingClientRect().top;

    selfie.rotation.y +=.01;
    selfie.rotation.z +=.01;

    camera.position.z = t * -.01;
    camera.position.x = t* -.0002;
    camera.position.y = t* -.0002;
}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame( animate);

    earth.rotation.y +=.005;

    // controls.update();

    renderer.render(scene, camera);
}

animate();