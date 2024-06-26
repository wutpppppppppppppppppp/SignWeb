import * as THREE from "three"

export function nodeTraverse(model, name) {
  let node = model
  model.traverse((child) => {
    if (child.name === name && child instanceof THREE.Bone) {
      node = child
    }
  })
  return node
}
