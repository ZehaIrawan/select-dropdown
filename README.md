Select Dropdown

# Usage

Add this to your project package.json

```
  "dependencies": {
    "select-dropdown": "git+https://github.com/ZehaIrawan/select-dropdown.git#9791557c2278c4ae4119629b737fc63fe1f34aa7"
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