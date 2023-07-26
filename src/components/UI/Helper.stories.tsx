import type { Meta, StoryObj } from '@storybook/react';
import Helper from './Helper';

const meta = {
  title: 'UI/Helper',
  component: Helper,
  tags: ['autodocs'],
  args: {
    children: <h1>Helper</h1>,
    className: 'class',
  },
} satisfies Meta<typeof Helper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
