import type { Meta, StoryObj } from '@storybook/react';
import VideoContainer from './VideoContainer';

const meta = {
  title: 'UI/VideoContainer',
  component: VideoContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof VideoContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Big Buck Bunny - Blender Animated Movie',
    src: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
    className: 'class',
  },
};
