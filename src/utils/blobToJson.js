// utils/blobToJson.js

/**
 * Converts a BLOB to a JSON object.
 *
 * @param {Blob} blob - The BLOB to convert.
 * @returns {Promise<Object>} A promise that resolves to the JSON object.
 *
 * Example:
 * ```logBlobAsJson(exampleBlob)
 * .then(() => console.log('BLOB has been logged as JSON'))
 * .catch(error => console.error('Error:', error));```
 */
export const blobToJson = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result)
        resolve(json)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsText(blob)
  })
}

/**
 * Logs the JSON object in a formatted manner.
 *
 * @param {Blob} blob - The BLOB to convert and log.
 * @returns {Promise<void>} A promise that resolves when logging is done.
 *
 * Example:
 * ```blobToJson(exampleBlob)
 * .then(json => {
 * console.log('JSON object:', json);
 *  // Do something with the JSON object
 * }).catch(error => console.error('Error:', error));```
 */
export const logBlobAsJson = async (blob) => {
  try {
    const json = await blobToJson(blob)
    console.log(JSON.stringify(json, null, 2))
  } catch (error) {
    console.error("Error parsing BLOB to JSON:", error)
  }
}
