import { LayersModel, Tensor, browser, image, loadLayersModel, scalar} from "@tensorflow/tfjs"

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
  model: LayersModel,
  setPrediction: (s: string) => void
) => {
  if (!imageSrc) return;

  const img = document.createElement("img");
  img.src = imageSrc;

  let tensor = browser.fromPixels(img).toFloat();
  tensor.div(scalar(255));
  console.log("Got Tensor")

  if (!model) {
    console.log("Model not loaded")
    return
  }

  tensor = image.rgbToGrayscale(image.resizeBilinear(tensor, [48, 48])).expandDims(0)

  const pred = model.predict(tensor) as Tensor
  const emotionIndex = pred.argMax().dataSync()[0]

  const emotions = ["Angry", "Disgust", "Fear", "Happy", "Neutral", "Sad", "Surprise"]
  setPrediction(emotions[emotionIndex])
}