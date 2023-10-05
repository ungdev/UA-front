import type { Meta, StoryObj } from '@storybook/react';
import Square from './Square';

const meta = {
  title: 'UI/Square',
  component: Square,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'class',
    onClick: () => {
      console.log('onClick');
    },
  },
} satisfies Meta<typeof Square>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imgSrc: 'https://via.placeholder.com/150',
  },
};
