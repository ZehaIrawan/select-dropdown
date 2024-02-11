import { useState } from "react";
import "./selectdropdown.css";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options?: Option[];
  placeholder?: string;
  searchable?: boolean;
}

const SelectDropdown: React.FC<Props> = ({
  options = [],
  placeholder = "",
  searchable = false,
}) => {
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const [searchString, setSearchString] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchString(value);

    if (searchable) {
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase()),
      );
      setDropdownOptions(filteredOptions);
    }
  };

  return (
    <div className="bg-tomato">
      <input
        type="text"
        value={searchString}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          width: "100%",
          height: "2rem",
        }}
        onChange={handleSearchString}
        placeholder={placeholder}
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
