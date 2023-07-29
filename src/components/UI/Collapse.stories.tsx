import type { Meta, StoryObj } from '@storybook/react';
import Collapse from './Collapse';

const meta = {
  title: 'UI/Collapse',
  component: Collapse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Title',
    children: <h1>Content</h1>,
    link: 'https://example.com',
  },
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'class',
    id: 'id',
  },
};

export const InitVisible: Story = {
  args: {
    initVisible: true,
  },
};
