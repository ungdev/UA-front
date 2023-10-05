import type { Meta, StoryObj } from '@storybook/react';
import UserModal from './UserModal';
import { UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin } from '@/types';
import { Providers } from '@/lib/provider';

const meta = {
  title: 'Dashboard/UserModal',
  component: UserModal,
  tags: ['autodocs'],
  render: (args) => (
    <Providers>
      <UserModal {...args} />
    </Providers>
  ),
} satisfies Meta<typeof UserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchUser: {
      id: '1',
    } as UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin,
    onClose: () => {},
  },
};
