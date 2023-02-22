import { useEffect, useState } from 'react'
import './App.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {VOXLoader} from 'three/examples/jsm/loaders/VOXLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import {VRMLLoader} from 'three/examples/jsm/loaders/VRMLLoader'
import { AMFLoader } from 'three/examples/jsm/loaders/AMFLoader'
// import {3MFLoader} from 'three/examples/jsm/loaders/3MFLoader'


function App() {

  useEffect(() => {
    const color1 = new THREE.Color("rgb(255,0,0)");

    const scene = new THREE.Scene(color1);

    const camera = new THREE.PerspectiveCamera(
      50, 
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.z=96;

    const canvas = document.getElementById('myThreeJsCanvas')
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    ambientLight.castShadow = true;
    scene.add()

    const spotLight = new THREE.SpotLight(0xfffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight)


    // const boxGeometry = new THREE.BoxGeometry(16,16,16);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // scene.add(boxMesh);

    const gltfLoader = new GLTFLoader()
    const loader = new STLLoader()

    const envTexture = new THREE.TextureLoader().load([
    './src/rings/texture.jpg'

])

    // envTexture.mapping = THREE.CubeReflectionMapping

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xb2ffc8,
      envMap: envTexture,
      metalness: 0.25,
      roughness: 0.1,
      opacity: 1.0,
      transparent: true,
      transmission: 0.99,
      clearcoat: 1.0,
      clearcoatRoughness: 0.25
  })

    loader.load(
        './src/rings/ring.stl',
        function (geometry) {
            const mesh = new THREE.Mesh(geometry,)

            scene.add(mesh)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )


    // gltfLoader.load('./src/shiba/scene.gltf', function(obj) {
    //   obj.scene.scale.set(10,10,10)
    //   scene.add(obj.scene)
    // }, undefined, function (error) {
    //   console.error(error)
    // }
    // )


    const controls = new OrbitControls(camera, renderer.domElement)

    const stats = Stats()
    document.body.appendChild(stats.dom)

    const animate = () => {
      stats.update();
      controls.update();
      // boxMesh.rotation.x += 0.01
      // boxMesh.rotation.y += 0.01
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, [])


  return (
    <div>
      <canvas id='myThreeJsCanvas' />
    </div>
  )
}

export default App
