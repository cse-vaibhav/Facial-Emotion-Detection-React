import { useRef, useState } from 'react';

import './App.css';
import DetectEmotion from './components/DetectEmotion/DetectEmotion';
import UploadFile from './components/UploadFile/UploadFile';
import ImageIcon from './icons/ImageIcon';

export default function App() {

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [filename, setFileName] = useState("");
  const imgRef = useRef<HTMLImageElement | null>(null);

  // remove video access
  // navigator.mediaDevices.getUserMedia({ video: false, audio: false })

  return (
    <div>
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
          
          <UploadFile filename={filename} setFileName={setFileName} imageSrc={imageSrc} setImageSrc={setImageSrc} />
          {/*<ImageCapture setImageSrc={setImageSrc} />*/}
          <DetectEmotion filename={filename} imageSrc={imageSrc} />
        </div>
      </div>
    </div>
  )
}
