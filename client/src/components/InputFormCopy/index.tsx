import './InputFormCopy.scss';

import React, { FC, useRef, useState } from 'react';

interface InputFormCopyProps {
  label: string;
  text: string;
}

const InputFormCopy: FC<InputFormCopyProps> = ({
  label,
  text
}: InputFormCopyProps) => {
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (inputFieldRef.current) {
      inputFieldRef.current.select();
      inputFieldRef.current.setSelectionRange(0, 99999);
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  return (
    <form className="copy-form">
      <label htmlFor="copy-form-el">{label}</label>
      <div className="copy-form-group">
        <input
          type="text"
          id="copy-form-el"
          className="copy-form-input"
          readOnly
          value={text}
          ref={inputFieldRef}
        />
        <button
          id="copy-form-btn"
          type="button"
          className="copy-btn"
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </form>
  );
};

export default InputFormCopy;
