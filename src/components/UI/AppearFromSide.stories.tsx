import AppearFromSide from '@/components/UI/AppearFromSide';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/AppearFromSide',
  component: AppearFromSide,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppearFromSide>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Put it out of view and then scroll down to it',
  },
};
