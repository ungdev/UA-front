import type { Meta, StoryObj } from '@storybook/react';
import Countdown from './Countdown';

const meta = {
  title: 'UI/Countdown',
  component: Countdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 14),
    className: 'class',
  },
};

export const Passed: Story = {
  args: {
    date: new Date('2023-01-01T00:00:00'),
    className: 'class',
  },
};
