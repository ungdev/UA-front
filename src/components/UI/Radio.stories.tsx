import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';

const meta = {
  title: 'UI/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    label: 'Radio',
    options: [
      { name: 'Option 1', value: 'option1' },
      { name: 'Option 2', value: 'option2' },
      { name: 'Option 3', value: 'option3' },
    ],
    value: 'option1',
    onChange: (value: string) => console.log(value),
    name: 'radio',
    row: false,
    className: 'class',
    disabled: false,
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Row: Story = {
  args: {
    row: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
