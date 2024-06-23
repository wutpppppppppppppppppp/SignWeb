import { mappedPart } from "./mappedPart"

export function updateBoneData(jsonData, model) {
  // console.log(jsonData, model)

  model.traverse((node) => {
    if (node.isBone) {
      let jsonName = mappedPart(node.name)

      if (jsonData.scene.actors[0].body[jsonName]) {
        let pos = jsonData.scene.actors[0].body[jsonName].position
        let rot = jsonData.scene.actors[0].body[jsonName].rotation

        if (pos) {
          node.position.set(pos.x, pos.y, pos.z)
        }

        if (rot) {
          node.quaternion.set(rot.x, rot.y, rot.z, rot.w)
        }
      } else {
        console.warn(`No data found for bone: ${jsonName}`)
      }
    }
  })
}
