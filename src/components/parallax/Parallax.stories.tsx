import type { Meta, StoryObj } from '@storybook/react';
import Parallax from './Parallax';
import ParallaxElementSettings from '@/components/parallax/ParallaxElementSettings';

const meta = {
  title: 'parallax/Parallax',
  component: Parallax,
  tags: ['autodocs'],
  args: {
    children: [
      <ParallaxElementSettings speed={2.5} key={0}>Parallax element 1</ParallaxElementSettings>,
      <ParallaxElementSettings speed={1.5} key={1}>Parallax element 2</ParallaxElementSettings>,
    ],
  },
} satisfies Meta<typeof Parallax>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
