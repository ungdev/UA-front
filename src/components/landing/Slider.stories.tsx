import type { Meta, StoryObj } from '@storybook/react';
import Slider from './Slider';

const meta = {
  title: 'Landing/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slides: [
      <div key={'input-1'} style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
        Test 1
      </div>,
      <div key={'input-2'} style={{ backgroundColor: 'green', width: '100%', height: '100%' }}>
        Test 2
      </div>,
      <div key={'input-3'} style={{ backgroundColor: 'blue', width: '100%', height: '100%' }}>
        Test 3
      </div>,
    ],
  },
};
