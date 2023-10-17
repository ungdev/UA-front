import type { Meta, StoryObj } from '@storybook/react';
import ItemModal from './ItemModal';
import { Providers } from '@/lib/provider';
import { AdminItem } from '@/types';

const meta = {
  title: 'Dashboard/ItemModal',
  component: ItemModal,
  tags: ['autodocs'],
  render: (args) => (
    <Providers>
      <ItemModal {...args} />
    </Providers>
  ),
} satisfies Meta<typeof ItemModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: '1',
    } as AdminItem,
    onClose: () => {},
  },
};
