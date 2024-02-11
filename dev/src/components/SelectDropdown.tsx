import React, { useState } from "react";
import "./selectdropdown.css";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options?: Option[];
  placeholder?: string;
  withSearch?: boolean;
}

interface Value {
  // Define the structure of your value here, including finalValue
  finalValue: Option[];
}

const SelectDropdown: React.FC<Props> = ({
  options = [],
  placeholder = "",
  withSearch = false,
}) => {
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const [searchString, setSearchString] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [_value, setValue] = useState<Value>({
    finalValue: [],
  });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // setTimeout(() => {
    setIsFocused(false);
    // }, 100);
  };

  const handleSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchString(value);

    if (withSearch) {
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase()),
      );
      setDropdownOptions(filteredOptions);
    }
  };

  console.log(isFocused, "isFocused", withSearch, "withSearch");

  const handleSelect = (index: number) => {
    console.log("clicked");

    const existingValue = _value.finalValue.find(
      (v) => v.label === options[index].label,
    );

    if (!existingValue) {
      setValue((prev) => ({
        ...prev,
        finalValue: [...prev.finalValue, options[index]],
      }));
    }
  };

  const handleRemoveSelectedValue = (selectedLabel: string) => {
    setValue((prev) => ({
      ...prev,
      finalValue: prev.finalValue.filter((v) => v.label !== selectedLabel),
    }));
  };

  return (
    <div>
      {/* Chips */}
      <div className="select-chips" onClick={handleFocus}>
        {_value.finalValue.map((v: Option) => (
          <div key={v.label} className="chip">
            <span>{v.label}</span>
            <button onClick={() => handleRemoveSelectedValue(v.label)}>
              X
            </button>
          </div>
        ))}
      </div>

      {withSearch && (
        <input
          className="select-input"
          type="text"
          value={searchString}
          style={{
            width: "100%",
            height: "2rem",
          }}
          onChange={handleSearchString}
          placeholder={placeholder}
        />
      )}

      {((withSearch && isFocused) || isFocused) &&
        dropdownOptions.map((option, index) => (
          <span
            onClick={() => handleSelect(index)}
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
