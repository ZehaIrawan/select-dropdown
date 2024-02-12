import React, { useState, useEffect, useRef } from "react";
import "./selectdropdown.css";
import { MagnifyingGlass, X, CaretDown } from "@phosphor-icons/react";
import Portal from "./Portal"; // Corrected import path

interface Option {
  value: string;
  label: string;
}

interface Props {
  options?: Option[];
  placeholder?: string;
  withSearch?: boolean;
  multiple?: boolean;
  withPortal?: boolean;
}

interface Value {
  finalValue: Option[];
}

const SelectDropdown: React.FC<Props> = ({
  options = [],
  placeholder = "",
  withSearch = false,
  multiple = false,
  withPortal = false,
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

  const handleSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleSelect = (optionValue: string) => {
    const selectedOption: Option | undefined = dropdownOptions.find(
      (o) => o.value === optionValue,
    );

    if (selectedOption && !multiple && _value.finalValue.length === 0) {
      setValue((prev) => ({
        ...prev,
        finalValue: [...prev.finalValue, selectedOption],
      }));

      setDropdownOptions((prevOptions) =>
        prevOptions.filter((option) => option.value !== selectedOption.value),
      );
    }

    if (selectedOption && multiple) {
      setValue((prev) => ({
        ...prev,
        finalValue: [...prev.finalValue, selectedOption],
      }));

      setDropdownOptions((prevOptions) =>
        prevOptions.filter((option) => option.value !== selectedOption.value),
      );
    }
  };

  const handleRemoveSelectedValue = (selectedLabel: string) => {
    setValue((prev) => ({
      ...prev,
      finalValue: prev.finalValue.filter((v) => v.label !== selectedLabel),
    }));

    const removedOption = _value.finalValue.filter(
      (v) => v.label === selectedLabel,
    )?.[0];

    setDropdownOptions((prev) => [...prev, removedOption]);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          !event.target.classList.contains("dropdown-option") &&
          !event.target.classList.contains("dropdown-options") &&
          !event.target.classList.contains("select-input") &&
          !event.target.classList.contains("select-chips")
        ) {
          setIsFocused(false);
          setSearchString("");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef);

  const renderDropdown = () => {
    if (isFocused) {
      let filteredOptions = dropdownOptions;
      if (withSearch) {
        filteredOptions = dropdownOptions.filter((option) =>
          option.label.toLowerCase().includes(searchString.toLowerCase()),
        );
      }
      return (
        <div className={`dropdown-options ${withSearch && "with-search"}`}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <span
                onClick={() => handleSelect(option.value)}
                className="dropdown-option"
                key={option.value}
              >
                {option.label}
              </span>
            ))
          ) : (
            <span className="dropdown-option">No option</span>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Chips */}
      <div
        className={`select-chips ${isFocused ? "active" : ""}`}
        onClick={handleFocus}
        ref={dropdownRef}
      >
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
      {withSearch && isFocused && (
        <div className="select-input-container" id="select-input">
          <MagnifyingGlass size={24} weight="bold" />
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
            onFocus={handleFocus}
          />
        </div>
      )}
      {withPortal ? (
        <Portal target="#root">{isFocused && renderDropdown()}</Portal>
      ) : (
        renderDropdown()
      )}
    </div>
  );
};

export default SelectDropdown;
