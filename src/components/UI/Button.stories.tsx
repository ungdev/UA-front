import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

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

export const Default: Story = {
  args: {
    className: 'class',
    children: 'Button',
    onClick: () => {
      console.log('onClick');
    }
  },
};

export const Primary: Story = {
  args: {
    primary: true,
    children: 'Button',
    onClick: () => {
      console.log('onClick');
    }
  },
};

export const Secondary: Story = {
  args: {
    isPink: true,
    children: 'Button',
    onClick: () => {
      console.log('onClick');
    }
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Button',
    onClick: () => {
      console.log('onClick');
    }
  },
};

export const Pink: Story = {
  args: {
    isPink: true,
    children: 'Button',
    onClick: () => {
      console.log('onClick');
    }
  },
};

export const Type: Story = {
  args: {
    type: 'submit',
    children: 'Button',
    onClick: () => {
      console.log('onClick');
    }
  },
};