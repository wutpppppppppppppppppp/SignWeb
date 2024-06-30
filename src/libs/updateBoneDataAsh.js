import { mappedPart } from "./mappedPart"
import { nodeTraverse } from "./nodeTraverse"
import * as THREE from "three"

export function updateBoneData(jsonData, model) {
  model = nodeTraverse(model, "Hips")
  model.traverse((node) => {
    // console.log(JSON.stringify(node.name))
    // console.log(jsonData.scene.actors[0].body, mappedName)

    let mappedName = mappedPart(node.name)
    if (mappedName && jsonData.scene.actors[0].body[mappedName]) {
      // Adding AxesHelper to the bone (only once)
      //   if (!node.getObjectByName("axesHelper")) `1{
      //     const axesHelper = new THREE.AxesHelper(0.1)
      //     axesHelper.name = "axesHelper"
      //     node.add(axesHelper)
      //   }

      // Access the jsonData for assigning
      const boneData = jsonData.scene.actors[0].body[mappedName]
      // Construct Vector3 objects
      const desiredWorldPosition = new THREE.Vector3(
        boneData.position.x,
        boneData.position.y,
        boneData.position.z
      )
      // Create a variable to collect the parent position
      const parentWorldMatrix = new THREE.Matrix4()
      // Tell the node that we will update the relative position
      node.parent.updateMatrixWorld(true)

      parentWorldMatrix.copy(node.parent.matrixWorld)

      const inverseParentWorldMatrix = new THREE.Matrix4()
        .copy(parentWorldMatrix)
        .invert()

      const desiredLocalPosition = desiredWorldPosition.applyMatrix4(
        inverseParentWorldMatrix
      )
      node.position.copy(desiredLocalPosition)

      const desiredWorldQuaternion = new THREE.Quaternion(
        boneData.rotation.x,
        boneData.rotation.y,
        boneData.rotation.z,
        boneData.rotation.w
      )
      const parentWorldQuaternion = new THREE.Quaternion()
      node.parent.updateMatrixWorld(true)
      parentWorldQuaternion.copy(node.parent.quaternion)
      const inverseParentWorldQuaternion = parentWorldQuaternion
        .clone()
        .invert()
      const desiredLocalQuaternion = desiredWorldQuaternion.premultiply(
        inverseParentWorldQuaternion
      )
      node.quaternion.copy(desiredLocalQuaternion)

      node.updateMatrixWorld(true)
    } else {
      // console.error(`No data found for bone: ${node.name}`)
    }
    // }
  })
}
