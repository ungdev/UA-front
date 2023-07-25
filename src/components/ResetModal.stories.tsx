import type { Meta, StoryObj } from '@storybook/react';
import ResetModal from './ResetModal';
import { Providers } from '@/lib/provider';

const meta = {
  title: 'Main/ResetModal',
  component: ResetModal,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: (args: any) => (
    <Providers>
      <ResetModal {...args} />
    </Providers>
  ),
} satisfies Meta<typeof ResetModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    resetToken: '1234567890',
  },
};
