import type { Meta, StoryObj } from '@storybook/react';
import PartnerModal from './PartnerModal';
import { AdminPartner } from '@/types';
import { Providers } from '@/lib/provider';

const meta = {
  title: 'Dashboard/PartnerModal',
  component: PartnerModal,
  tags: ['autodocs'],
  render: (args) => (
    <Providers>
      <PartnerModal {...args} />
    </Providers>
  ),
} satisfies Meta<typeof PartnerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    partner: {
      id: '1',
    } as AdminPartner,
    onClose: () => {},
  },
};

export const New: Story = {
  args: {
    partner: null,
    onClose: () => {},
  },
};
