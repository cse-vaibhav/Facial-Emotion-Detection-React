import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { detect, loadModel } from "../utils.ts";

export default function DetectEmotion({
  imageSrc,
  filename,
  setPrediction
}: {
  imageSrc: string | null,
  filename: string,
  setPrediction: (s: string) => void
}) {

  const [model, setModel] = useState<tf.LayersModel | null>(null)

  useEffect(() => {
    // @ts-ignore
    loadModel(setModel)
  }, [])

  return <div className="block">
    <button onClick={() => detect(imageSrc, model, filename, setPrediction)}>Detect Emotion</button>
  </div>

}