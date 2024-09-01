import type { Meta, StoryObj } from '@storybook/react';
import DraggableList from './DraggableList';

const meta = {
  title: 'UI/DraggableList',
  component: DraggableList,
  tags: ['autodocs'],
  args: {
    items: [
      <div key={1} style={{ width: 300, height: 300, background: 'red' }} />,
      <div key={2} style={{ width: 300, height: 300, background: 'blue' }} />,
      <div key={3} style={{ width: 300, height: 300, background: 'green' }} />,
      <div key={4} style={{ width: 300, height: 300, background: 'yellow' }} />,
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

export const Default: Story = {
  args: {
    onReorder: (order) =>
      console.log(order.map((id) => (id === 0 ? 'red' : id === 1 ? 'blue' : id === 2 ? 'green' : 'yellow'))),
  },
};
