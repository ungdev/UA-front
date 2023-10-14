import type { Meta, StoryObj } from '@storybook/react';
import DraggableList from './DraggableList';

const meta = {
  title: 'UI/DraggableList',
  component: DraggableList,
  tags: ['autodocs'],
  args: {
    items: [
      <div style={{ width: 300, height: 300, background: 'red' }} />,
      <div style={{ width: 300, height: 300, background: 'blue' }} />,
      <div style={{ width: 300, height: 300, background: 'green' }} />,
      <div style={{ width: 300, height: 300, background: 'yellow' }} />,
    ],
    availableWidth: 400,
    blockWidth: 300,
    blockHeight: 300,
    blockGap: 8,
  },
  // center layout
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DraggableList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
