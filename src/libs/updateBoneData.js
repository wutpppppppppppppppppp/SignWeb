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
    "RightFinger"
  ]
  // const initialPosition = new THREE.Vector3(0, 0, 0); // Example initial position
  // const initialRotation = new THREE.Quaternion(); // Example initial rotation (identity quaternion)
  // function resetNodeToInitial(node) {
  //   // Reset position
  //   node.position.copy(initialPosition);
  
  //   // Reset rotation
  //   node.quaternion.copy(initialRotation);
  
  //   // Update matrix to apply changes
  //   node.updateMatrix();
  // }
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
        // )
        // node.quaternion.identity()
        node.quaternion.copy(
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
        node.updateMatrix();
      } else {
        console.error(`No data found for bone: ${node.name}`)
      }
    }
  })

  // console.log("Finished updating specified bones")
}