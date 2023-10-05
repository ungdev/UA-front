import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    type: 'text',
    label: 'Input',
    placeholder: 'Placeholder',
    value: '',
    onChange: (value: string) => console.log(value),
    min: 0,
    max: 100,
    className: 'class',
    autocomplete: 'off',
    disabled: false,
    autoFocus: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const Email: Story = {
  args: {
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
  },
};

export const Autocomplete: Story = {
  args: {
    autocomplete: 'on',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Autofocus: Story = {
  args: {
    autoFocus: true,
  },
};
