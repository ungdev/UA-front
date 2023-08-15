import type { Meta, StoryObj } from '@storybook/react';
import CartItem from './CartItem';
const meta = {
  title: 'Dashboard/CartItem',
  component: CartItem,
  tags: ['autodocs'],
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemName: 'Item Name',
    quantity: 1,
    unitPrice: 100,
    reducedUnitPrice: null,
    onRemove: () => {},
  },
};
