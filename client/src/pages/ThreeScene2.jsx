// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { useEffect, useRef } from 'react';

// const ThreeScene2 = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     // Scene setup
//     const scene = new THREE.Scene();

//     // Renderer setup
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.outputEncoding = THREE.sRGBEncoding;
//     renderer.setSize(window.innerWidth/2, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     mountRef.current.appendChild(renderer.domElement);

//     // Camera setup
//     const camera = new THREE.PerspectiveCamera(75, (window.innerWidth/2 ) / (window.innerHeight/2 ), 0.1, 1000);
//     camera.position.set(0, 1, 5)

//     // Lighting setup
//     const spotlight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
//     spotlight.position.set(0, 25, 0);
//     scene.add(spotlight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 10, 7.5);
//     scene.add(directionalLight);

//     let mixer;

//     // Load the GLTF model
//     const loader = new GLTFLoader();
//     loader.load(
//       '/src/models/monkey_dancing/scene.gltf', // Ensure this path is correct
//       (gltf) => {
//         console.log('Model loaded successfully');
//         const model = gltf.scene;
//         model.scale.set(1, 1, 1); // Adjust scale if necessary
//         scene.add(model);

//         // Initialize the animation mixer and play all animations
//         mixer = new THREE.AnimationMixer(model);
//         gltf.animations.forEach((clip) => {
//           mixer.clipAction(clip).play();
//         });
//       },
//       undefined,
//       (error) => {
//         console.error('An error happened while loading the model', error);
//       }
//     );

//     // Animation loop
//     const clock = new THREE.Clock();
//     const animate = () => {
//       requestAnimationFrame(animate);

//       const delta = clock.getDelta();
//       // Update the mixer for animations
//       if (mixer) {
//         mixer.update(delta);
//       }
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = (window.innerWidth) / (window.innerHeight);
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     // Clean up on unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       // mountRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   // return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;


// };

// export default ThreeScene2;

// import React, { useEffect, useRef } from "react"
// import { Canvas, useFrame } from "@react-three/fiber"
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from "@react-three/drei"


// const ThreeScene2 = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     // Scene setup
//     // const scene = new THREE.Scene();

//     // // Renderer setup
//     // const renderer = new THREE.WebGLRenderer({ antialias: true });
//     // renderer.outputEncoding = THREE.sRGBEncoding;
//     // renderer.setSize(window.innerWidth/2, window.innerHeight);
//     // renderer.setPixelRatio(window.devicePixelRatio);

//     // const currentMount = mountRef.current;
//     // currentMount.appendChild(renderer.domElement);

//     // // Camera setup
//     // const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
//     // camera.position.set(0, 1, 5);

//     // // Lighting setup
//     // const spotlight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
//     // spotlight.position.set(0, 25, 0);
//     // scene.add(spotlight);

//     // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     // directionalLight.position.set(5, 10, 7.5);
//     // scene.add(directionalLight);

//     let mixer;

//     // Load the GLTF model
//     const loader = new GLTFLoader();
//     loader.load(
//       '/src/models/monkey_dancing/scene.gltf', // Ensure this path is correct
//       (gltf) => {
//         console.log('Model loaded successfully');
//         const model = gltf.scene;
//         model.scale.set(1, 1, 1); // Adjust scale if necessary
//         scene.add(model);

//         // Initialize the animation mixer and play all animations
//         mixer = new THREE.AnimationMixer(model);
//         gltf.animations.forEach((clip) => {
//           mixer.clipAction(clip).play();
//         });
//       },
//       undefined,
//       (error) => {
//         console.error('An error happened while loading the model', error);
//       }
//     );

//     // Animation loop
//     const clock = new THREE.Clock();
//     const animate = () => {
//       requestAnimationFrame(animate);

//       const delta = clock.getDelta();
//       // Update the mixer for animations
//       if (mixer) {
//         mixer.update(delta);
//       }

//     };
//     animate();

//     // Handle container resize
//     // const handleResize = () => {
//     //   camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
//     //   camera.updateProjectionMatrix();
//     //   renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
//     // };
//     // window.addEventListener('resize', handleResize);

//     // Clean up on unmount
//     // return () => {
//     //   window.removeEventListener('resize', handleResize);
//     //   currentMount.removeChild(renderer.domElement);
//     //   renderer.dispose();
//     // };
//   }, []);

//   return (
//     <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
//       <ambientLight intensity={1} />
//       <directionalLight position={[5, 10, 7.5]} intensity={1} />
//       <OrbitControls enableDamping />
//       {/* <ModelWithUpdates innerRef={jsonDataRef} /> */}
//     </Canvas>
//   )
// };

// export default ThreeScene2;


// This is three-fiber codefor 3d display

import React, { useEffect, useRef } from "react"
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/src/models/Rokoko_model/scene.gltf');
  const mixer = useRef();

  useEffect(() => {
    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.current.clipAction(clip).play();
      });
    }
  }, [gltf]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={gltf.scene} scale={1} />;
};

const ThreeScene2 = () => {
  return (
    <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <color attach="background" args={['#fffff']} />
      <Model />
      <OrbitControls enableDamping /> //This is for camera movement
    </Canvas>
  )
};

export default ThreeScene2;
