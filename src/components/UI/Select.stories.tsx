import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    value: 'option1',
    onChange: (value: string) => console.log(value),
    disabled: false,
    className: 'class',
  },
};
