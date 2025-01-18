import React, { ChangeEvent, FunctionComponent, useState } from "react";

interface CommonDropDownProps {
  options: string[];
  handleFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  id: string;
}

const CommonDropDown: FunctionComponent<CommonDropDownProps> = ({
  options,
  handleFilterChange,
  label,
  id,
}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange(e);
    setValue(e.target.value);
  };
  return (
    <div className="dropdown-inner-container">
      <p>{label}</p>
      <select
        id={id}
        className="drop-down-select-container"
        value={value}
        onChange={handleChange}
      >
        {options.map((data, index) => (
          <option key={index} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommonDropDown;
