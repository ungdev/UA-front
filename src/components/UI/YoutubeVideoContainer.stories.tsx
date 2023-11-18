import type { Meta, StoryObj } from '@storybook/react';
import YoutubeVideoContainer from './YoutubeVideoContainer';

const meta = {
  title: 'UI/YoutubeVideoContainer',
  component: YoutubeVideoContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof YoutubeVideoContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'aqz-KE-bpKQ',
    className: 'class',
  },
};
