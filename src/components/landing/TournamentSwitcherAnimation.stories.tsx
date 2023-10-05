import type { Meta, StoryObj } from '@storybook/react';
import TournamentSwitcherAnimation from './TournamentSwitcherAnimation';

const meta = {
  title: 'Landing/TournamentSwitcherAnimation',
  component: TournamentSwitcherAnimation,
  tags: ['autodocs'],
} satisfies Meta<typeof TournamentSwitcherAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TournamentSwitcherAnimation',
  },
};
