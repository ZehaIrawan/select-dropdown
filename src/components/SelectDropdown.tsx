import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options?: Option[];
}

const SelectDropdown: React.FC<Props> = ({ options = [] }) => {
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const [searchString, setSearchString] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div>
      <input
        type="text"
        value={searchString}
        onChange={handleSearchString}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          width: "100%",
          height: "2rem",
        }}
      />
      {isFocused &&
        dropdownOptions.map((option) => (
          <span
            style={{
              display: "block",
              border: "1px solid tomato",
              padding: "1rem 2rem",
            }}
            key={option.label}
          >
            {option.label}
          </span>
        ))}
    </div>
  );
};

export default SelectDropdown;
