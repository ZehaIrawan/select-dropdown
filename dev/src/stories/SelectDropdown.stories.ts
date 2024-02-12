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

export const MultipleWithSearch: Story = {
  args: {
    options: frameWorkOptions,
    placeholder: "Select a framework",
    multiple: true,
    withSearch: true,
  },
};

export const MultipleWithoutSearch: Story = {
  args: {
    options: frameWorkOptions,
    placeholder: "Select a framework",
    multiple: true,
  },
};

export const SingleOptionWithSearch: Story = {
  args: {
    options: frameWorkOptions,
    placeholder: "Select a framework",
    withSearch: true,
  },
};

export const SingleOptionWithoutSearch: Story = {
  args: {
    options: frameWorkOptions,
    placeholder: "Select a framework",
  },
};
