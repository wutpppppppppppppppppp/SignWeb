import { mappedPart } from "./mappedPart"
import { nodeTraverse } from "./nodeTraverse"
import * as THREE from "three"

export function updateBoneData(jsonData, model) {
  model = nodeTraverse(model, "Hips")

  const boneNamesToUpdate = [
    // "RightShoulder",
    "RightArm",
    // "RightForeArm",
    // "RightHand",
    // "LeftShoulder",
    // "LeftArm",
    // "LeftForeArm",
    // "LeftHand",
  ]
  // Traverse the model and update only the specified bones
  model.traverse((node) => {
    if (node instanceof THREE.Bone && boneNamesToUpdate.includes(node.name)) {
      let mappedName = mappedPart(node.name)
      // console.log(jsonData.scene.actors[0].body, mappedName)
      if (mappedName && jsonData.scene.actors[0].body[mappedName]) {
        // Adding AxesHelper to the bone (only once)
        if (!node.getObjectByName("axesHelper")) {
          const axesHelper = new THREE.AxesHelper(10)
          axesHelper.name = "axesHelper"
          node.add(axesHelper)
        }
        const boneData = jsonData.scene.actors[0].body[mappedName]
        console.log(
          `${mappedName} position: ${boneData.position.x}, ${boneData.position.y}, ${boneData.position.z}\nrotation: ${boneData.rotation.x}, ${boneData.rotation.y}, ${boneData.rotation.z}`
        )
        // console.log(
        //   `current:${node.position.x}, ${node.position.y}, ${node.position.z}`
        // )
        node.position.set(
          boneData.position.x,
          boneData.position.y,
          boneData.position.z
        )
        // console.log(
        //   `new:${node.position.x}, ${node.position.y}, ${node.position.z}`
        // )
        node.updateMatrixWorld()
        node.quaternion.set(
          boneData.rotation.x,
          boneData.rotation.y,
          boneData.rotation.z,
          boneData.rotation.w
        )
        node.updateMatrixWorld()
        // Example position and rotation values
        // const position = new THREE.Vector3(
        //   boneData.position.x,
        //   boneData.position.y,
        //   boneData.position.z
        // )
        // const quaternion = new THREE.Quaternion(
        //   boneData.rotation.x,
        //   boneData.rotation.y,
        //   boneData.rotation.z,
        //   boneData.rotation.w
        // )

        // // Default scale
        // const scale = new THREE.Vector3(1, 1, 1)

        // // Create the transformation matrix
        // const matrix = new THREE.Matrix4()
        // matrix.compose(position, quaternion, scale)
        // node.applyMatrix4(matrix)
        // // Now you can use this matrix to transform objects or apply it to bones

        // // let translation = new THREE.Vector3(),
        // //   rotation = new THREE.Quaternion(),
        // //   scale = new THREE.Vector3()
        // // console.log(node.matrix.decompose(translation, rotation, scale))
        // console.log(node)
        // node.position.set(
        //   boneData.position.x,
        //   boneData.position.y,
        //   boneData.position.z
        // )
        // node.quaternion.set(
        //   boneData.rotation.x,
        //   boneData.rotation.y,
        //   boneData.rotation.z,
        //   boneData.rotation.w
        // )
        // const matx = new THREE.Matrix4()
        // const vect = new THREE.Vector3(
        //   boneData.position.x,
        //   boneData.position.y,
        //   boneData.position.z
        // )
        // const quat = new THREE.Quaternion(
        //   boneData.rotation.x,
        //   boneData.rotation.y,
        //   boneData.rotation.z,
        //   boneData.rotation.w
        // )
        // const scal = new THREE.Vector3(1, 1, 1)
        // matx.compose(vect, quat, scal)
        // node.applyMatrix4(matx)
        // node.position
        // const euler = new THREE.Euler(
        //   boneData.rotation.x,
        //   boneData.rotation.y,
        //   boneData.rotation.z,
        //   "ZYX"
        // )
        // node.quaternion.setFromEuler(euler)
        // node.updateMatrixWorld()
        // node.applyMatrix4(node)
        // node.geometry.translate(
        //   boneData.position.x,
        //   boneData.position.y,
        //   boneData.position.z
        // )
        // node.quaternion.translateX(boneData.rotation.x)
        // node.quaternion.translateY(boneData.rotation.y)
        // node.quaternion.translateZ(boneData.rotation.z)
      } else {
        console.error(`No data found for bone: ${node.name}`)
      }
    }
  })
}
