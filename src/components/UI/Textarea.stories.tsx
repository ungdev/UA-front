import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'class',
    label: 'Label',
    placeholder: 'Placeholder',
    value: 'Value',
    onChange: (value) => {
      console.log(value);
    },
  },
};
