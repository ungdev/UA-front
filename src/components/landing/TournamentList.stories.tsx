import type { Meta, StoryObj } from '@storybook/react';
import TournamentList from './TournamentList';

const meta = {
  title: 'Landing/TournamentList',
  component: TournamentList,
  tags: ['autodocs'],
} satisfies Meta<typeof TournamentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
