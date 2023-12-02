import { useRef, useState } from 'react';

import './App.css';
import DetectEmotion from './components/DetectEmotion/DetectEmotion';
import UploadFile from './components/UploadFile/UploadFile';
import ImageIcon from './icons/ImageIcon';

export default function App() {

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [filename, setFileName] = useState("");
  const [prediction, setPrediction] = useState("")
  const imgRef = useRef<HTMLImageElement | null>(null);

  // remove video access
  // navigator.mediaDevices.getUserMedia({ video: false, audio: false })

  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-6xl font-bold">
        Facial Emotion Detection
      </h1>
      <div className='flex justify-center'>

        <div className='imagebox'>
          {(imageSrc)
            ? <img src={imageSrc} ref={imgRef} />
            : <ImageIcon />}
        </div>

        <div className='flex flex-col justify-center gap-1'>
          
          <UploadFile filename={filename} setFileName={setFileName} setImageSrc={setImageSrc} />
          {/*<ImageCapture setImageSrc={setImageSrc} />*/}
          <DetectEmotion setPrediction={setPrediction} filename={filename} imageSrc={imageSrc} />
        </div>
      </div>
      {prediction && 
        <div className='m-8 text-3xl bg-slate-800 px-8 py-6 rounded-xl'>
          {prediction}
        </div>}
    </div>
  )
}
