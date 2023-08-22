import type { Meta, StoryObj } from '@storybook/react';
import TournamentModal from './TournamentModal';
import { AdminTournament, UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin } from '@/types';
import { Providers } from '@/lib/provider';

const meta = {
  title: 'Dashboard/TournamentModal',
  component: TournamentModal,
  tags: ['autodocs'],
  render: (args) => (
    <Providers>
      <TournamentModal {...args} />
    </Providers>
  ),
} satisfies Meta<typeof TournamentModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tournament: {
      id: '1',
    } as AdminTournament,
    onClose: () => {},
  },
};
