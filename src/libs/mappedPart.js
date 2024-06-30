export function mappedPart(nodeName) {
  // THREE -> JSON
  const boneMapping = {
    Hips: "hip",
    Spine1: "spine",

    // Fix this, no spine 2, 3, 4
    Spine2: "",
    Spine3: "",
    Spine4: "chest",
    Neck: "neck",
    Head: "head",

    // No headtip for JSON.
    HeadTip: "",

    // Right
    RightShoulder: "rightShoulder",
    RightArm: "rightUpperArm",
    RightForeArm: "rightLowerArm",
    RightHand: "rightHand",
    // No metacarpal for JSON.
    RightFinger5Metacarpal: "",
    RightFinger5Proximal: "rightLittleProximal",
    RightFinger5Medial: "rightLittleMedial",
    RightFinger5Distal: "rightLittleDistal",
    RightFinger5Tip: "rightLittleTip",
    // No metacarpal for JSON.
    RightFinger4Metacarpal: "",
    RightFinger4Proximal: "rightRingProximal",
    RightFinger4Medial: "rightRingMedial",
    RightFinger4Distal: "rightRingDistal",
    RightFinger4Tip: "rightRingTip",
    // No metacarpal for JSON.
    RightFinger3Metacarpal: "",
    RightFinger3Proximal: "rightMiddleProximal",
    RightFinger3Medial: "rightMiddleMedial",
    RightFinger3Distal: "rightMiddleDistal",
    RightFinger3Tip: "rightMiddleTip",
    // No metacarpal for JSON.
    RightFinger2Metacarpal: "",
    RightFinger2Proximal: "rightIndexProximal",
    RightFinger2Medial: "rightIndexMedial",
    RightFinger2Distal: "rightIndexDistal",
    RightFinger2Tip: "rightIndexTip",

    RightFinger1Metacarpal: "rightThumbProximal",
    RightFinger1Proximal: "rightThumbMedial",
    RightFinger1Distal: "rightThumbDistal",
    RightFinger1Tip: "rightThumbTip",

    // Fix this # Add toe tip
    RightThigh: "rightUpLeg",
    RightShin: "rightLeg",
    RightFoot: "rightFoot",
    RightToe: "rightToe",
    RightToeTip: "rightToeEnd",

    // Left
    LeftShoulder: "leftShoulder",
    LeftArm: "leftUpperArm",
    LeftForeArm: "leftLowerArm",
    LeftHand: "leftHand",
    // No metacarpal for JSON.
    LeftFinger5Metacarpal: "",
    LeftFinger5Proximal: "leftLittleProximal",
    LeftFinger5Medial: "leftLittleMedial",
    LeftFinger5Distal: "leftLittleDistal",
    LeftFinger5Tip: "leftLittleTip",
    // No metacarpal for JSON.
    LeftFinger4Metacarpal: "",
    LeftFinger4Proximal: "leftRingProximal",
    LeftFinger4Medial: "leftRingMedial",
    LeftFinger4Distal: "leftRingDistal",
    LeftFinger4Tip: "leftRingTip",
    // No metacarpal for JSON.
    LeftFinger3Metacarpal: "",
    LeftFinger3Proximal: "leftMiddleProximal",
    LeftFinger3Medial: "leftMiddleMedial",
    LeftFinger3Distal: "leftMiddleDistal",
    LeftFinger3Tip: "leftMiddleTip",
    // No metacarpal for JSON.
    LeftFinger2Metacarpal: "",
    LeftFinger2Proximal: "leftIndexProximal",
    LeftFinger2Medial: "leftIndexMedial",
    LeftFinger2Distal: "leftIndexDistal",
    LeftFinger2Tip: "leftIndexTip",

    LeftFinger1Metacarpal: "leftThumbProximal",
    LeftFinger1Proximal: "leftThumbMedial",
    LeftFinger1Distal: "leftThumbDistal",
    LeftFinger1Tip: "leftThumbTip",

    // Fix this # Add toe tip
    LeftThigh: "leftUpLeg",
    LeftShin: "leftLeg",
    LeftFoot: "leftFoot",
    LeftToe: "leftToe",
    LeftToeTip: "leftToeEnd",
  }

  return boneMapping[nodeName] || null
}
