import type { Meta, StoryObj } from '@storybook/react';
import Slider from './Slider';
import React from 'react';

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
      <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>Test 1</div>,
      <div style={{ backgroundColor: 'green', width: '100%', height: '100%' }}>Test 2</div>,
      <div style={{ backgroundColor: 'blue', width: '100%', height: '100%' }}>Test 3</div>,
    ],
  },
};
