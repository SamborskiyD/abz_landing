import React from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  helperText?: string;
  label: string;
}

const Input = ({
  className,
  label,
  error,
  helperText,
  ...props
}: InputProps) => {
  return (
    <div>
      <div className={`input-container ${error && "input-container__red"}`}>
        <input {...props} className={`${className} input`} />
        <label className={`label ${error && 'label__red'}`} htmlFor={props.id}>
          {label}
        </label>
      </div>
      {error && <p className="bottom-text bottom-text__red">{error}</p>}
      {!error && helperText && (
        <p className="bottom-text bottom-text__gray">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
