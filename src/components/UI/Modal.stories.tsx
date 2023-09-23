import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Modal',
    children: <h1>Modal</h1>,
    buttons: <h1>Buttons</h1>,
    visible: true,
    closable: true,
    onCancel: () => console.log('Cancel'),
    onOk: () => console.log('Ok'),
    className: 'class',
    containerClassName: 'containerClass',
  },
};

export const NoButtons: Story = {
  args: {
    title: 'Modal',
    children: <h1>Modal</h1>,
    visible: true,
    closable: true,
    onCancel: () => console.log('Cancel'),
    className: 'class',
    containerClassName: 'containerClass',
  },
};

export const NoTitle: Story = {
  args: {
    children: <h1>Modal</h1>,
    buttons: <h1>Buttons</h1>,
    visible: true,
    closable: true,
    onCancel: () => console.log('Cancel'),
    className: 'class',
    containerClassName: 'containerClass',
  },
};

export const NoClosable: Story = {
  args: {
    title: 'Modal',
    children: <h1>Modal</h1>,
    buttons: <h1>Buttons</h1>,
    visible: true,
    onCancel: () => console.log('Cancel'),
    className: 'class',
    containerClassName: 'containerClass',
  },
};
