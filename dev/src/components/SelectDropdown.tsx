import React, { useState } from "react";
import "./selectdropdown.css";
import { MagnifyingGlass, X, CaretDown } from "@phosphor-icons/react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options?: Option[];
  placeholder?: string;
  withSearch?: boolean;
  multiple?: boolean;
}

interface Value {
  // Define the structure of your value here, including finalValue
  finalValue: Option[];
}

const SelectDropdown: React.FC<Props> = ({
  options = [],
  placeholder = "",
  withSearch = false,
  multiple = false,
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
    setTimeout(() => {
      setIsFocused(false);
    }, 10);
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

  // console.log(isFocused, "isFocused", withSearch, "withSearch");

  const handleSelect = (index: number) => {
    // console.log("clicked");

    const existingValue = _value.finalValue.find(
      (v) => v.label === options[index].label,
    );

    if (!existingValue && !multiple && _value.finalValue.length === 0) {
      setValue((prev) => ({
        ...prev,
        finalValue: [...prev.finalValue, options[index]],
      }));
    }

    if (!existingValue && multiple) {
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
              <X size={16} weight="bold" />
            </button>
          </div>
        ))}
        <CaretDown size={24} weight="bold" />
      </div>

      {withSearch && (
        <div className="select-input">
          <MagnifyingGlass size={24} weight="bold" />
          <input
            type="text"
            value={searchString}
            style={{
              width: "100%",
              height: "2rem",
            }}
            onChange={handleSearchString}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      )}

      {((withSearch && isFocused) || isFocused) &&
        dropdownOptions.map((option, index) => (
          <span
            onClick={() => handleSelect(index)}
            className="dropdown-option"
            key={option.label}
          >
            {option.label}
          </span>
        ))}
    </div>
  );
};

export default SelectDropdown;
