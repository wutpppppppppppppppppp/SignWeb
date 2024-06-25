import { mappedPart } from "./mappedPart"
import { nodeTraverse } from "./nodeTraverse"
import * as THREE from "three"

export function updateBoneData(scene, jsonData, model) {
  model = nodeTraverse(model, "Hips")

  const boneNamesToUpdate = [
    "RightShoulder",
    "RightArm",
    "RightForeArm",
    "RightHand",
  ]

  // Traverse the model and update only the specified bones
  model.traverse((node) => {
    if (node.isBone && boneNamesToUpdate.includes(node.name)) {
      let jsonName = mappedPart(node.name)
      if (jsonName && jsonData.scene.actors[0].body[jsonName]) {
        const boneData = jsonData.scene.actors[0].body[jsonName]
        const axesHelper = new THREE.AxesHelper(0.5)
        node.add(axesHelper)
        // console.log(node.matrixWorld.decompose, boneData.rotation)
        // node.position.set(
        //   boneData.position.x,
        //   boneData.position.y,
        //   boneData.position.z

        // node.quaternion.set(
        //   -boneData.rotation.x,
        //   -boneData.rotation.y,
        //   -boneData.rotation.z,
        //   boneData.rotation.w
        // )

        // const matFour = new THREE.Matrix4()
        // matFour.compose(boneData.position, boneData.rotation, (1, 1, 1))
        // node.Matrix4.copy(matFour)
      } else {
        console.error(`No data found for bone: ${node.name}`)
      }
    }
  })
  if (typeof scene.renderer !== "undefined") {
    scene.renderer.render(scene, scene.camera)
  } else {
    console.warn("Renderer or camera not found in the scene.")
  }
  // console.log("Finished updating specified bones")
}
