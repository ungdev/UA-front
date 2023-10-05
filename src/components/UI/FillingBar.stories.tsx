import type { Meta, StoryObj } from '@storybook/react';
import FillingBar from './FillingBar';

const meta = {
  title: 'UI/FillingBar',
  component: FillingBar,
  tags: ['autodocs'],
} satisfies Meta<typeof FillingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fullness: 0.5,
  },
};
