import * as THREE from "three"

export function detachNodes(model) {
  if (!model) {
    console.error("Model is null or undefined.")
    return []
  }
  const nodes = []

  model.traverse((node) => {
    if (node instanceof THREE.Object3D) {
      nodes.push(node)
      // Store original children
      node.userData.originalChildren = [...node.children]
      // Detach node from parent
      node.removeFromParent()
    }
  })

  return { nodes }
}
export function reattachNodes(nodes, scene) {
  nodes.forEach((node) => {
    // Reattach to the scene (or another root object)
    scene.attach(node)

    // Reattach original children
    node.userData.originalChildren.forEach((child) => {
      node.add(child)
    })

    // Clean up userData
    delete node.userData.originalChildren
  })
}
