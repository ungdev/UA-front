import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      {
        key: "1",
        title: "Test 1",
        content: "Test 1",
        onClick: () => {
          console.log("Test 1");
        }
      },
      {
        key: "2",
        title: "Test 2",
        content: "Test 2",
        onClick: () => {
          console.log("Test 2");
        }
      },
    ],
    defaultIndex: 0,
    className: 'class',
  },
};

export const Index: Story = {
  args: {
    tabs: [
      {
        key: "1",
        title: "Test 1",
        content: "Test 1",
        onClick: () => {
          console.log("Test 1");
        }
      },
      {
        key: "2",
        title: "Test 2",
        content: "Test 2",
        onClick: () => {
          console.log("Test 2");
        }
      },
    ],
    defaultIndex: 1,
    className: 'class',
  },
};