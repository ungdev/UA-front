import type { Meta, StoryObj } from '@storybook/react';
import Partners from './Partners';
import { Providers } from '@/lib/provider';

const meta = {
  title: 'Main/Partners',
  component: Partners,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <Providers>
      <Partners />
    </Providers>
  ),
} satisfies Meta<typeof Partners>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
