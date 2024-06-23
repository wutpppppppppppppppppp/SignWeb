export function selectPart(model) {
  if (model) {
    model.traverse((node) => {
      if (node.isBone && node.name === "mixamorig1Neck") {
        neckbone = node
      }
      if (node.isBone && node.name === "mixamorig1LeftShoulder") {
        lefthand = node
      }
    })
  }

  return { neckbone, lefthand }
}
