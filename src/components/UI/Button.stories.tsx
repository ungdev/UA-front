import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { within, expect, fn } from '@storybook/test';

const meta = {
  title: 'UI/Button',
  component: Button,
  args: { onClick: fn() },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

let _defaultButtonPressed = false;
let _primaryButtonPressed = false;
let _secondaryButtonPressed = false;
let _outlineButtonPressed = false;
let _disabledButtonPressed = false;
let _largeButtonPressed = false;
let _longButtonPressed = false;
let _veryLongButtonPressed = false;
let _typeButtonPressed = false;

export const Default: Story = {
  args: {
    className: 'class',
    children: 'Button',
    onClick: fn(() => {
      _defaultButtonPressed = true;
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    await expect(_defaultButtonPressed).toBe(true);
  },
};

export const Primary: Story = {
  args: {
    primary: true,
    children: 'Button',
    onClick: fn(() => {
      _primaryButtonPressed = true;
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    await expect(_primaryButtonPressed).toBe(true);
  },
};

export const Secondary: Story = {
  args: {
    secondary: true,
    children: 'Button',
    onClick: fn(() => {
      _secondaryButtonPressed = true;
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    await expect(_secondaryButtonPressed).toBe(true);
  },
};

export const Outline: Story = {
  args: {
    primary: true,
    outline: true,
    children: 'Button',
    onClick: fn(() => {
      _outlineButtonPressed = true;
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    await expect(_outlineButtonPressed).toBe(true);
  },
};

export const Disabled: Story = {
  args: {
    primary: true,
    disabled: true,
    children: 'Button',
    onClick: fn(() => {
      _disabledButtonPressed = true;
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    // The button is disabled, it should not be clickable
    await expect(_disabledButtonPressed).toBe(false);
  },
};

export const Large: Story = {
  args: {
    primary: true,
    large: true,
    children: 'Button',
    onClick: fn(() => {
      _largeButtonPressed = true;
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    await expect(_largeButtonPressed).toBe(true);
  },
};

export const Long: Story = {
  args: {
    primary: true,
    long: true,
    children: 'Button',
    onClick: fn(() => {
      _longButtonPressed = true;
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    await expect(_longButtonPressed).toBe(true);
  },
};

export const VeryLong: Story = {
  args: {
    primary: true,
    veryLong: true,
    children: 'Button',
    onClick: fn(() => {
      _veryLongButtonPressed = true;
    }),
  },
  render: (args) => {
    return (
      // To demonstrate the veryLong button, we need to set a width on the container
      <div style={{ width: '50vw' }}>
        <Button {...args} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    await expect(_veryLongButtonPressed).toBe(true);
  },
};

export const Type: Story = {
  args: {
    type: 'submit',
    children: 'Button',
    onClick: fn(() => {
      _typeButtonPressed = true;
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    await expect(_typeButtonPressed).toBe(true);
  },
};
