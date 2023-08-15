import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta = {
  title: 'UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'discord',
    className: 'test',
  },
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  render: (args) => {
    return (
      <div style={{ width: 100, height: 100 }}>
        <Icon {...args} />
      </div>
    );
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    fill: true,
  },
};

export const WideStroke: Story = {
  args: {
    strokeWidth: 4,
  },
};
