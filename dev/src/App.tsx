import React from "react";
import SelectDropdown from "./components/SelectDropdown";
import "./App.css";

function App() {
  const frameWorkOptions = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

  return (
    <>
      {/* <h1>Without Search</h1>
      <SelectDropdown options={frameWorkOptions} withSearch={false} />*/}

      <h1 style={{ marginTop: "1rem" }}>With Search and multiple</h1>
      <SelectDropdown
        options={frameWorkOptions}
        withSearch={true}
        multiple={true}
        withPortal={true}
      />

      <SelectDropdown
        options={frameWorkOptions}
        withSearch={true}
        multiple={true}
        withPortal={true}
      />

      {/* <h1 style={{ marginTop: "1rem" }}>With Portal</h1>
      <SelectDropdown
        options={frameWorkOptions}
        withSearch={true}
        multiple={true}
        withPortal={true}
      /> */}
    </>
  );
}

export default App;
