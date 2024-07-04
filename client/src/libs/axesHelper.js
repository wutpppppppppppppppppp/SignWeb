import * as THREE from "three"

// Function to add AxesHelper to a node if it doesn't already have one
export function addAxesHelper(node) {
  if (!node.getObjectByName("axesHelper")) {
    const axesHelper = new THREE.AxesHelper(10)
    axesHelper.name = "axesHelper"
    node.add(axesHelper)
  }
}

// Function to add AxesHelper to a list of nodes
export function addAxesHelpersToNodes(nodes) {
  nodes.forEach((node) => {
    addAxesHelper(node)
  })
}
