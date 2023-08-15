import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { Providers } from '@/lib/provider';

const meta = {
  title: 'Main/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <Providers>
      <Header {...args} />
    </Providers>
  ),
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    connected: false,
  },
};

export const Connected: Story = {
  args: {
    connected: true,
  },
};

export const Admin: Story = {
  args: {
    connected: true,
    admin: true,
  },
};
