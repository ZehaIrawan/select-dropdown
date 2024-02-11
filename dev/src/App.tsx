import SelectDropdown from "./components/SelectDropdown";

function App() {
  const frameWorkOptions = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

  return (
    <>
      <SelectDropdown options={frameWorkOptions} />
    </>
  );
}

export default App;
