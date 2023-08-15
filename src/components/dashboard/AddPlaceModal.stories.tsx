import type { Meta, StoryObj } from '@storybook/react';
import AddPlaceModal from './AddPlaceModal';
import { Providers } from '@/lib/provider';
const meta = {
  title: 'Dashboard/AddPlaceModal',
  component: AddPlaceModal,
  tags: ['autodocs'],
  render: (args) => (
    <Providers>
      <AddPlaceModal {...args} />
    </Providers>
  ),
  args: {
    userId: '1',
    username: 'test',
    hasTicket: false,
    teamMembersWithoutTicket: [],
    needsAttendant: false,
    onQuit: (placeFor, placeId) => {},
  },
} satisfies Meta<typeof AddPlaceModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
