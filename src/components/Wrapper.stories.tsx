import type { Meta, StoryObj } from '@storybook/react';
import Wrapper from './Wrapper';
import { Providers } from '@/lib/provider';

const meta = {
  title: 'Main/Wrapper',
  component: Wrapper,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: (args: unknown) => (
    <Providers>
      <Wrapper {...args} />
    </Providers>
  ),
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <h1>Hello World!</h1>,
  },
};
