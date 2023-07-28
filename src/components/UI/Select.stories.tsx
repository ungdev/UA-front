import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

let _value = 'option1';

export const Default: Story = {
  args: {
    label: 'Select',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    value: _value,
    onChange: (value: string) => (_value = value),
    disabled: false,
    className: 'class',
    id: 'test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByLabelText('Select');
    await expect(select).toBeInTheDocument();
    await userEvent.selectOptions(select, 'option2');
    await expect(_value).toBe('option2');
  },
};
