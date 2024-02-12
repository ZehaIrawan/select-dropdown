import type { Meta, StoryObj } from "@storybook/react";

import SelectDropdown from "../components/SelectDropdown";

const meta = {
  title: "SelectDropdown",
  component: SelectDropdown,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SelectDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const frameWorkOptions = [
  { value: "react", label: "React" },
  { value: "ng", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

export const MultipleWithoutSearch: Story = {
  args: {
    options: frameWorkOptions,
    placeholder: "Select a framework",
    multiple: true,
  },
};
