import type { Meta, StoryObj } from '@storybook/react';
import TextStroke from './TextStroke';

const meta = {
  title: 'UI/TextStroke',
  component: TextStroke,
  tags: ['autodocs'],
  args: {
    children: 'TextStroke',
    width: 8,
  },
} satisfies Meta<typeof TextStroke>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const VeryStroked: Story = {
  args: {
    width: 20,
  },
};
