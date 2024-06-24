import { mappedPart } from "./mappedPart"
import { nodeTraverse } from "./nodeTraverse"

import { mappedPart } from "./mappedPart"

export function updateBoneData(jsonData, model) {
  console.log("It's working")
  model.traverse((node) => {
    if (node.isBone) {
      let jsonName = mappedPart(node.name)
      console.log(`${node.name}: Node is Bone`)
      if (jsonData.scene.actors[0].body[jsonName]) {
        const pos = jsonData.scene.actors[0].body[jsonName].position
        const rot = jsonData.scene.actors[0].body[jsonName].rotation

        if (pos) {
          node.position.set(pos.x, pos.y, pos.z)
        }

        if (rot) {
          node.quaternion.set(rot.x, rot.y, rot.z, rot.w)
          node.quaternion.normalize()
        }

        // Ensure bone transforms are updated
        node.updateMatrix()
        node.updateMatrixWorld(true)
      } else {
        console.warn(`No data found for bone: ${jsonName}`)
      }
    } else if (!node.isBone) {
      console.log("Node is notBone")
      let jsonName = mappedPart(node.name)
      console.log(`${node.name}: Node is Bone`)
      if (jsonData.scene.actors[0].body[jsonName]) {
        const pos = jsonData.scene.actors[0].body[jsonName].position
        const rot = jsonData.scene.actors[0].body[jsonName].rotation

        if (pos) {
          node.position.set(pos.x, pos.y, pos.z)
        }

        if (rot) {
          node.quaternion.set(rot.x, rot.y, rot.z, rot.w)
          node.quaternion.normalize()
        }

        // Update matrix and matrix world
        node.updateMatrix()
        node.updateMatrixWorld(true)

        // Assuming 'group' is defined as a THREE.Group somewhere in your code
        group.add(node) // Add node to the group
      } else {
        console.warn(`No data found for Object3D: ${jsonName}`)
      }
    }
  })
}
