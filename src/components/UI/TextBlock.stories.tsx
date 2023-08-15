import type { Meta, StoryObj } from '@storybook/react';
import TextBlock from './TextBlock';

const meta = {
  title: 'UI/TextBlock',
  component: TextBlock,
  tags: ['autodocs'],
  args: {
    children: 'TextBlock',
    images: [
      'https://picsum.photos/seed/1/1920/1080',
      'https://picsum.photos/seed/2/1920/1080',
    ],
    title: "Testing"
  },
} satisfies Meta<typeof TextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Left: Story = {
  args: {
    left: true,
  },
};
