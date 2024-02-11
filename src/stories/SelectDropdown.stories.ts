import type { Meta, StoryObj } from "@storybook/react";

import SelectDropdown from "../components/SelectDropdown";

const meta = {
  title: "Example/SelectDropdown",
  component: SelectDropdown,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SelectDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const frameWorkOptions = [
  { value: "react", label: "React" },
  { value: "ng", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

export const Placeholder: Story = {
  args: {
    options: frameWorkOptions,
    placeholder: "Select a framework",
  },
};
