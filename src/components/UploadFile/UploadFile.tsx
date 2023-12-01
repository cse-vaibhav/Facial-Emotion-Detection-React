import { Dispatch, SetStateAction, useRef } from "react";
import "./UploadFile.css";

export default function UploadFile({
  setImageSrc,
  filename,
  setFileName
}: {
  setImageSrc: Dispatch<SetStateAction<string | null>>
  filename: string
  setFileName: Dispatch<SetStateAction<string>>
}) {

  const file = useRef<HTMLInputElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function formOnClick(e: any) {
    e.preventDefault()
    file.current?.click()
  }

  function inputOnChange() {
    setFileName(file.current?.value.slice(12) || "")

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    }

    // @ts-ignore
    const f = file.current?.files[0]
    // @ts-ignore
    reader.readAsDataURL(f)
  }

  return <div className="block">
    <form>
      <label id="label-file-input" htmlFor="file-input">
        <h3>{filename && `Uploaded: ${filename}`}</h3>
        <button onClick={formOnClick}>Upload File</button>
        <input 
          accept="image/*"
          ref={file}
          onChange={inputOnChange} 
          id="file-input"
          type="file" />
      </label>
    </form>
  </div>
}