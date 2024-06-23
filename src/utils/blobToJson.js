export function blobToJson(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result)
        resolve(json)
      } catch (error) {
        reject(new Error("Error parsing JSON: " + error))
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading Blob: " + reader.error))
    }

    reader.readAsText(blob)
  })
}
