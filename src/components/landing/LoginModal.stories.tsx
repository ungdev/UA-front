import type { Meta, StoryObj } from '@storybook/react';
import LoginModal from './LoginModal';
import { Providers } from '@/lib/provider';

const meta = {
  title: 'Landing/LoginModal',
  component: LoginModal,
  tags: ['autodocs'],
  render: (args) => (
    <Providers>
      <LoginModal {...args} />
    </Providers>
  ),
} satisfies Meta<typeof LoginModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isVisible: true,
  },
};

export const Hidden: Story = {
  args: {
    isVisible: false,
  },
};
