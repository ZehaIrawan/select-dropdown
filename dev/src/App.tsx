import React from "react";
import SelectDropdown from "./components/SelectDropdown";

function App() {
  const frameWorkOptions = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

  return (
    <>
      <h1>With Search</h1>
      <SelectDropdown options={frameWorkOptions} withSearch={true} />

      <h1>With Search and multiple</h1>
      <SelectDropdown
        options={frameWorkOptions}
        withSearch={true}
        multiple={true}
      />
      <h1>Without Search</h1>
      <SelectDropdown options={frameWorkOptions} withSearch={false} />
    </>
  );
}

export default App;
