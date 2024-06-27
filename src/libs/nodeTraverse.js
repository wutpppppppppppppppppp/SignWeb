export function nodeTraverse(node, string) {
  let result = null

  function traverse(currentNode) {
    if (currentNode.name === string) {
      result = currentNode
      return
    }

    if (currentNode.children && currentNode.children.length > 0) {
      for (let i = 0; i < currentNode.children.length; i++) {
        traverse(currentNode.children[i])
        if (result) return // If result is found, exit the loop early
      }
    }
  }

  traverse(node)

  return result
}
