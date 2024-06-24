import { mappedPart } from "./mappedPart"
import { nodeTraverse } from "./nodeTraverse"

export function updateBoneData(jsonData, model) {
  // Find the starting node, "Hips"
  model = nodeTraverse(model, "Hips")

  // List of bone names to update
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
        console.log(node.quaternion, boneData.rotation)
        // node.position.set(
        //   boneData.position.x,
        //   boneData.position.y,
        //   boneData.position.z
        //
        // node.quaternion.identity()
        node.quaternion.set(
          -boneData.rotation.x,
          -boneData.rotation.y,
          -boneData.rotation.z,
          boneData.rotation.w
        )
        // node.rotation.set(
        //   boneData.rotation.x,
        //   boneData.rotation.y,
        //   boneData.rotation.z
        // )
      } else {
        console.error(`No data found for bone: ${node.name}`)
      }
    }
  })

  // console.log("Finished updating specified bones")
}
