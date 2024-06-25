import { mappedPart } from "./mappedPart"
import { nodeTraverse } from "./nodeTraverse"
import * as THREE from "three"

export function updateBoneData(jsonData, model) {
  model = nodeTraverse(model, "Hips")

  const boneNamesToUpdate = [
    "RightShoulder",
    "RightArm",
    "RightForeArm",
    "RightHand",
    "LeftShoulder",
    "LeftArm",
    "LeftForeArm",
    "LeftHand",
  ]

  // Traverse the model and update only the specified bones
  model.traverse((node) => {
    if (node instanceof THREE.Bone && boneNamesToUpdate.includes(node.name)) {
      let mappedName = mappedPart(node.name)
      if (mappedName && jsonData.scene.actors[0].body[mappedName]) {
        const boneData = jsonData.scene.actors[0].body[mappedName]
        console.log(
          `x,y,z: ${boneData.position.x}, ${boneData.position.y}, ${boneData.position.z}`
        )
        // console.log(${boneData.getWorldDirection})
        // Adding AxesHelper to the bone (only once)
        if (!node.getObjectByName("axesHelper")) {
          const axesHelper = new THREE.AxesHelper(10)
          axesHelper.name = "axesHelper"
          node.add(axesHelper)
        }

        // Update bone transformation
        // node.position.set(
        //   boneData.position.x,
        //   boneData.position.y,
        //   boneData.position.z
        // )

        node.quaternion.set(
          -boneData.rotation.x,
          -boneData.rotation.y,
          -boneData.rotation.z,
          boneData.rotation.w
        )

        // Log the updated position and rotation for debugging
        /*         console.log(
          `Updated bone: ${node.name}, Position: ${node.position}, Rotation: ${node.quaternion}`
        ) */
      } else {
        console.error(`No data found for bone: ${node.name}`)
      }
    }
  })
}
