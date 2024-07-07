import { mappedPart } from "./mappedPart"
import { nodeTraverse } from "./nodeTraverse"
import { addAxesHelper } from "./axesHelper"
import * as THREE from "three"

export function updateBoneData(jsonData, model) {
  model = nodeTraverse(model, "Hips")
  model.traverse((node) => {
    // console.log(JSON.stringify(node.name),jsonData.scene.actors[0].body, mappedName)
    let mappedName = mappedPart(node.name)
    if (mappedName && jsonData.scene.actors[0].body[mappedName]) {
      const boneData = jsonData.scene.actors[0].body[mappedName]
      const desiredWorldPosition = new THREE.Vector3(
        boneData.position.x,
        boneData.position.y,
        boneData.position.z
      )
      node.parent.updateMatrixWorld(true)
      const parentWorldMatrix = new THREE.Matrix4()
      parentWorldMatrix.copy(node.parent.matrixWorld)
      const inverseParentWorldMatrix = new THREE.Matrix4()
        .copy(parentWorldMatrix)
        .invert()
      // multiply 3D vector with inverse parent world matrix
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
    } else if (mappedName == null) {
      // If the bone is not in JSON, inherit position and rotation from parent
      if (node.parent) {
        node.position.copy(node.parent.position)
        node.quaternion.copy(node.parent.quaternion)
        node.updateMatrixWorld(true)
      }
    } else {
      // For unsupported bone or missing data from JSON
      if (previousFrameData[node.name]) {
        node.position.copy(previousFrameData[node.name].position)
        node.quaternion.copy(previousFrameData[node.name].quaternion)
        node.updateMatrixWorld(true)
      }
    }
  })
}
