
import "./ImageBox.css";

interface ImageBoxProps {
  imageUrl: string;
  setImageUrl: (s: string | null) => void
}

export default function ImageBox({ imageUrl }: ImageBoxProps) {
  return (
    <div className="image-container">
      <div className="rounded-corner top-left" />
      <div className="rounded-corner top-right" />
      <div className="rounded-corner bottom-left" />
      <div className="rounded-corner bottom-right" />

      <img src={imageUrl} alt="User provided" className="image-input" />
    </div>
  );
}
