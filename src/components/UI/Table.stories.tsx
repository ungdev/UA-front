import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';

const meta = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'class',
    columns: [
      {
        key: 'first_name',
        title: 'First Name',
      },
      {
        key: 'last_name',
        title: 'Last Name',
      },
    ],
    dataSource: [
      {
        first_name: 'Robert',
        last_name: 'Downey Jr.',
      },
      {
        first_name: 'Chris',
        last_name: 'Evans',
      },
      {
        first_name: 'Mark',
        last_name: 'Ruffalo',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    className: 'class',
    columns: [
      {
        key: 'first_name',
        title: 'First Name',
      },
      {
        key: 'last_name',
        title: 'Last Name',
      },
    ],
    dataSource: [],
    emptyText: 'No data',
  },
};

export const AlignRight: Story = {
  args: {
    className: 'class',
    columns: [
      {
        key: 'first_name',
        title: 'First Name',
      },
      {
        key: 'last_name',
        title: 'Last Name',
      },
    ],
    dataSource: [
      {
        first_name: 'Robert',
        last_name: 'Downey Jr.',
      },
      {
        first_name: 'Chris',

        last_name: 'Evans',
      },
      {
        first_name: 'Mark',
        last_name: 'Ruffalo',
      },
    ],
    alignRight: true,
  },
};

export const Pagination: Story = {
  args: {
    className: 'class',
    columns: [
      {
        key: 'first_name',
        title: 'First Name',
      },
      {
        key: 'last_name',
        title: 'Last Name',
      },
    ],
    dataSource: [
      {
        first_name: 'Robert',
        last_name: 'Downey Jr.',
      },
      {
        first_name: 'Chris',
        last_name: 'Evans',
      },
      {
        first_name: 'Mark',
        last_name: 'Ruffalo',
      },
      {
        first_name: 'Robert',
        last_name: 'Downey Jr.',
      },
      {
        first_name: 'Chris',
        last_name: 'Evans',
      },
      {
        first_name: 'Mark',
        last_name: 'Ruffalo',
      },
      {
        first_name: 'Robert',
        last_name: 'Downey Jr.',
      },
      {
        first_name: 'Chris',
        last_name: 'Evans',
      },
      {
        first_name: 'Mark',
        last_name: 'Ruffalo',
      },
      {
        first_name: 'Robert',
        last_name: 'Downey Jr.',
      },
      {
        first_name: 'Chris',
        last_name: 'Evans',
      },
      {
        first_name: 'Mark',
        last_name: 'Ruffalo',
      },
    ],
    pagination: true,
    // TODO: Fix this as it is not working
    paginationOptions: {
      goToPage: (number: number) => console.log(number),
      page: 0,
      pageSize: 4,
      total: 12,
    },
  },
};

export const OnRowClicked: Story = {
  args: {
    className: 'class',
    columns: [
      {
        key: 'first_name',
        title: 'First Name',
      },
      {
        key: 'last_name',
        title: 'Last Name',
      },
    ],
    dataSource: [
      {
        first_name: 'Robert',
        last_name: 'Downey Jr.',
      },
      {
        first_name: 'Chris',
        last_name: 'Evans',
      },
      {
        first_name: 'Mark',
        last_name: 'Ruffalo',
      },
    ],
    onRowClicked: (id: number) => console.log(id),
  },
};
