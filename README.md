Select Dropdown

# Usage

Add this to your project package.json

```
  "dependencies": {
    "select-dropdown": "git+https://github.com/ZehaIrawan/select-dropdown.git#cc9cee24bde88c5e211ec1a77744012c433f7ebc"
  },
```

Then

```
npm i
```

Use it on your React Project
```
import SelectDropdown from "select-dropdown";

const optionsExample = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

<SelectDropdown placeholder="Search here" options={optionsExample}/>
```

# Running storybook
```
cd dev
npm i
npm run storybook
```