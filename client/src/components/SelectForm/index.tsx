import React, { FC } from 'react';
import './SelectForm.scss';

interface SelectFormProps {
  id: string;
  labelTitle: string;
  options: [string, string][];
  value: string;
  onSelect: (value: string) => void;
}

const SelectForm: FC<SelectFormProps> = ({
  id,
  labelTitle,
  options,
  value,
  onSelect
}: SelectFormProps) => {
  return (
    <form className="form-group">
      <label className="form-label" htmlFor={id}>
        {labelTitle}
      </label>
      <select
        className="form-control"
        id={id}
        value={value}
        onChange={(e) => onSelect(e.target.value)}
      >
        {options.map(([key, title], index) => (
          <option key={`${id}-${index}`} value={key}>
            {title}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectForm;
