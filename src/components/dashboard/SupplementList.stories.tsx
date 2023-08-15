import type { Meta, StoryObj } from '@storybook/react';
import SupplementList from './SupplementList';
const meta = {
  title: 'Dashboard/SupplementList',
  component: SupplementList,
  tags: ['autodocs'],
} satisfies Meta<typeof SupplementList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        name: 'Item 1',
        price: 100,
        image: 'https://via.placeholder.com/150',
        infos: 'test',
        left: 10,
        attribute: 'test',
        category: 'test',
      },
    ],
    supplementCart: [
      {
        itemId: '1',
        quantity: 1,
      },
    ],
    hasTicket: false,
    onSupplementCartChanges: () => {},
    onItemPreview: () => {},
    itemType: 'test',
    shopSectionName: 'test',
  },
};
