import type { Meta, StoryObj } from '@storybook/react';
import BoxContainer from './BoxContainer';

const meta = {
  title: 'Landing/BoxContainer',
  component: BoxContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof BoxContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Test',
    children: (
      <>
        <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>Test 1</div>
      </>
    ),
  },
};
