import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

let _defaultButtonPressed = false;
let _primaryButtonPressed = false;
// let _secondaryButtonPressed = false;
// let _disabledButtonPressed = false;
// let _pinkButtonPressed = false;
// let _typeButtonPressed = false;

export const Default: Story = {
  args: {
    className: 'class',
    children: 'Button',
    onClick: () => {
      _defaultButtonPressed = true;
    },
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
    onClick: () => {
      _primaryButtonPressed = true;
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    button.click();
    await expect(_primaryButtonPressed).toBe(true);
  },
};

// export const Secondary: Story = {
//   args: {
//     isPink: true,
//     children: 'Button',
//     onClick: () => {
//       _secondaryButtonPressed = true;
//     },
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const button = canvas.getByRole('button');
//     await expect(button).toBeInTheDocument();
//     button.click();
//     await expect(_secondaryButtonPressed).toBe(true);
//   },
// };

// export const Disabled: Story = {
//   args: {
//     disabled: true,
//     children: 'Button',
//     onClick: () => {
//       _disabledButtonPressed = true;
//     },
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const button = canvas.getByRole('button');
//     await expect(button).toBeInTheDocument();
//     button.click();
//     // The button is disabled, it should not be clickable
//     await expect(_disabledButtonPressed).toBe(false);
//   },
// };

// export const Pink: Story = {
//   args: {
//     isPink: true,
//     children: 'Button',
//     onClick: () => {
//       _pinkButtonPressed = true;
//     },
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const button = canvas.getByRole('button');
//     await expect(button).toBeInTheDocument();
//     button.click();
//     await expect(_pinkButtonPressed).toBe(true);
//   },
// };

// export const Type: Story = {
//   args: {
//     type: 'submit',
//     children: 'Button',
//     onClick: () => {
//       _typeButtonPressed = true;
//     },
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const button = canvas.getByRole('button');
//     await expect(button).toBeInTheDocument();
//     button.click();
//     await expect(_typeButtonPressed).toBe(true);
//   },
// };
