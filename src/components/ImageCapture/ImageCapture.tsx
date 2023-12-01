import { useRef } from "react"

export default function ImageCapture({
  setImageSrc
}: {
  setImageSrc: (s: string | null) => void
}) {

  const width = 320
  let height = 0
  let streaming = false

  const video = useRef<HTMLVideoElement | null>(null)
  const canvas = useRef<HTMLCanvasElement | null>(null)

  // Ask for video access
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  }).then(stream => {
    if (!video.current) return;

    video.current.srcObject = stream;
    video.current.play()
  }).catch(err => {
    console.error(`An error occurred: ${err}`)
  })

  const takePicture = (e: any) => {
    e.preventDefault()

    if (!canvas.current || !video.current) return;
    const context = canvas.current.getContext("2d")
    if (width && height) {
      canvas.current.width = width
      canvas.current.height = height
      context?.drawImage(video.current, 0, 0, width, height)

      const data = canvas.current.toDataURL("image/png")
      setImageSrc(data)
    }

    video.current.style.display = "none"
  }

  const videoCanPlay = () => {
    if (!streaming && video.current && canvas.current) {
      height = (video.current.videoHeight / video.current.videoWidth) * width

      video.current.setAttribute("width", width.toString())
      video.current.setAttribute("height", height.toString())
      canvas.current.setAttribute("width", width.toString())
      canvas.current.setAttribute("height", height.toString())
      streaming = true
    }
  }
  return <>
    <div className="camera">
      <video onCanPlay={videoCanPlay} ref={video} id="video">Video stream not available</video>
      <button onClick={takePicture} id="startButton">Take photo</button>
    </div>

    <canvas className="hidden" ref={canvas} id="canvas"></canvas>
  </>
}