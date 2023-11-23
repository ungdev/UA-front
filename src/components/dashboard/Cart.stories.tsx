import type { Meta, StoryObj } from '@storybook/react';
import Cart from './Cart';
import { UserAge, UserAttendant, UserType } from '@/types';
const meta = {
  title: 'Dashboard/Cart',
  component: Cart,
  tags: ['autodocs'],
} satisfies Meta<typeof Cart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cart: {
      tickets: {
        userIds: ['1'],
        attendant: undefined,
      },
      supplements: [
        {
          itemId: '1',
          quantity: 1,
        },
      ],
    },
    tickets: {
      '1': {
        id: '1',
      },
    },
    items: [
      {
        id: '1',
        name: 'Item 1',
        price: 100,
        image: 'https://via.placeholder.com/150',
        infos: 'test',
        left: 10,
      },
    ],
    teamMembers: [
      {
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        username: 'johndoe',
        type: UserType.player,
        email: 'test@test.test',
        hasPaid: true,
        permissions: [],
        place: '',
        scannedAt: null,
        discordId: null,
        teamId: '1',
        askingTeamId: null,
        age: UserAge.adult,
        attendant: {} as UserAttendant,
        orga: { roles: [] },
      },
    ],
    onItemRemoved: () => {},
    onTicketRemoved: () => {},
    onCartReset: () => {},
  },
};
