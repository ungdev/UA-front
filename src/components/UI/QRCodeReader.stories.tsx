import type { Meta, StoryObj } from '@storybook/react';
import QRCodeReader from './QRCodeReader';
import { QRCode } from 'jsqr';

const meta = {
  title: 'UI/QRCodeReader',
  component: QRCodeReader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof QRCodeReader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCode(code: QRCode) {
      console.log(code);
    },
    className: 'test',
  },
};
