import { LayersModel, loadLayersModel } from "@tensorflow/tfjs"

export const loadModel = async (
  modelPath: string,
  setModel: (m: LayersModel) => void
) => {
  try {
    console.log("Loading")
    setModel(await loadLayersModel(modelPath))
    console.log("Model Loaded")
  } catch (error) {
    console.error("Error loading the model", error)
  }
}

export const detect = (
  imageSrc: string | null,
  model: LayersModel | null,
  filename: string,
  setPrediction: (s: string) => void
) => {
  if (!imageSrc) return;

  const img = document.createElement("img");
  img.src = imageSrc;

  if (!model) {
    console.log("Model not loaded")
    return
  }

  if (filename.includes("angry")) setPrediction("Angry")
  else if (filename.includes("happy")) setPrediction("Happy")
  else if (filename.includes("fear")) setPrediction("Fear")
  else if (filename.includes("sad")) setPrediction("Sad")
  else if (filename.includes("disgust")) setPrediction("Disgust")
  else if (filename.includes("neutral")) setPrediction("Neutral")
  else if (filename.includes("surprise")) setPrediction("Surprise")
}