import { useState } from "react";
import "./FileInput.scss";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
}

const FileInput = ({ error, helperText, ...props }: FileInputProps) => {
  const [fileName, setFileName] = useState<string>("Upload your photo");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(e);

    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Upload your photo");
    }
  };
  return (
    <div>
      <div className="file-container">
        <input
          type="file"
          name="photo"
          id="actual-btn"
          hidden
          onChange={handleFileChange}
        />
        <label
          className={`file-button ${error && "file-button__red"}`}
          htmlFor="actual-btn"
        >
          Upload
        </label>
        <span
          className={`filename ${error && "filename__red"}`}
          id="file-chosen"
        >
          {fileName}
        </span>
      </div>
      {error && <p className="bottom-text bottom-text__red">{error}</p>}
      {helperText && (
        <p className="bottom-text bottom-text__gray">{helperText}</p>
      )}
    </div>
  );
};

export default FileInput;
