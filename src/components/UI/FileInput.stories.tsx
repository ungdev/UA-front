import type { Meta, StoryObj } from '@storybook/react';
import FileInput from './FileInput';

const meta = {
  title: 'UI/FileInput',
  component: FileInput,
  tags: ['autodocs'],
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PDF: Story = {
  args: {
    label: 'File',
    value: '',
    onChange: () => {},
    type: ['pdf'],
  },
};

export const Image: Story = {
  args: {
    label: 'File',
    value: 'https://picsum.photos/200/300',
    onChange: () => {},
    type: ['jpg'],
  },
};
