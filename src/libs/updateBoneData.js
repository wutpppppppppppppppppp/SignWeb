import { mappedPart } from "./mappedPart"

export function updateBoneData(jsonData, model) {
  console.log("Test log - If you see this, logging works!")

  model.traverse((node) => {
    console.log(`node right now: ${node.name}`)
    if (node.isBone) {
      let jsonName = mappedPart(node.name)
      console.log(`Bone: ${node.name}, Mapped Part: ${jsonName}`)

      if (jsonName && jsonData.scene.actors[0].body[jsonName]) {
        let pos = jsonData.scene.actors[0].body[jsonName].position
        let rot = jsonData.scene.actors[0].body[jsonName].rotation

        // console.log(
        //   `Before update - Position: ${node.position.toArray()}, Rotation: ${node.quaternion.toArray()}`
        // )
        // console.log(`Setting position for ${node.name}:`, pos)
        // console.log(`Setting rotation for ${node.name}:`, rot)

        if (pos) {
          node.position.set(pos.x, pos.y, pos.z)
        }

        if (rot) {
          node.quaternion.set(rot.x, rot.y, rot.z, rot.w)
          node.quaternion.normalize()
        }

        node.matrixAutoUpdate = true
        node.updateMatrix()
        node.updateMatrixWorld(true)

        // console.log(
        //   `After update - Position: ${node.position.toArray()}, Rotation: ${node.quaternion.toArray()}`
        // )
      } else if (!node.isBone) {
        // if (node.isGroup) {
        console.log(`it is ${JSON.parse(node.Object3D.isMesh)}`)
        // }
      }
    }
  })
}
