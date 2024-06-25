import * as THREE from "three"

export function detachNodes(model, scene) {
  if (!model) {
    console.error("Model is null or undefined.")
    return []
  }
  const nodes = []
  const parents = new Map()

  model.traverse((node) => {
    if (node instanceof THREE.Bone) {
      nodes.push(node)
      parents.set(node, node.parent)
      scene.attach(node) // Attach the node to the scene
    }
  })

  return { nodes, parents }
}
