import type { Meta, StoryObj } from '@storybook/react';
import DoubleImage from './DoubleImage';

const meta = {
  title: 'UI/DoubleImage',
  component: DoubleImage,
  tags: ['autodocs'],
  args: {
    image1: 'https://picsum.photos/seed/1/1920/1080',
    image2: 'https://picsum.photos/seed/2/1920/1080',
    className: 'test',
  },
  // Make it 500px height so it's easier to see
  render: (args) => {
    return (
      <div style={{ height: 500, width: 500, marginTop: 200 }}>
        <DoubleImage {...args} />
      </div>
    );
  },
  // center layout
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DoubleImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
