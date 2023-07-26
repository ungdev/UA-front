'use client';
import React from 'react';
import Divider from './Divider';

/**
 * Displays a table
 */
const Table = ({
  columns,
  dataSource,
  className,
  alignRight,
  emptyText,
  pagination,
  paginationOptions,
  onRowClicked,
}: {
  /**
   * Title and key of each column
   */
  columns: { key: string; title: string }[];
  /**
   * Data for each row, must follow the key of each column
   */
  dataSource: any[];
  /**
   * Class of the table
   */
  className?: string;
  /**
   * Align the last column to the right
   */
  alignRight?: boolean;
  /**
   * Text to display if there is no data
   */
  emptyText?: string;
  /**
   * Set pagination for the table
   */
  pagination?: boolean;
  /**
   *
   */
  paginationOptions?: {
    goToPage: (number) => void;
    page: number;
    pageSize: number;
    total: number;
  };
  /**
   * Function to execute when a row is clicked. It takes 1 argument : the id of the row clicked
   */
  onRowClicked?: (number) => void;
}) => (
  <div className="table-container">
    <table className={`table ${className}`}>
      <thead>
        <tr className="table-header">
          {columns.map((column) => (
            <th className={`table-column-${column.key}`} key={column.key}>
              {column.title}
            </th>
          ))}
        </tr>
        <tr>
          <td className="table-divider" colSpan={columns.length}>
            <Divider />
          </td>
        </tr>
      </thead>
      <tbody>
        {dataSource.length > 0 ? (
          dataSource.map((row, i) => (
            <tr key={`${row.key}-${i}`} onClick={() => onRowClicked(i)}>
              {columns.map((column, j) => {
                const lastColumn = j + 1 === columns.length && alignRight;
                return (
                  <td
                    key={`${row[column.key]}-${i}${j}`}
                    className={`table-column-${column.key}` + (lastColumn ? ' align-right' : '')}>
                    {row[column.key]}
                  </td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="table-void">
              {emptyText}
            </td>
          </tr>
        )}
      </tbody>
    </table>
    {pagination && (
      <div className="table-footer">
        <p>
          Page {paginationOptions.page + 1} / {Math.ceil(paginationOptions.total / paginationOptions.pageSize)}
        </p>
        <i
          className="fas fa-chevron-left pointer"
          onClick={() => paginationOptions.page < 1 || paginationOptions.goToPage(paginationOptions.page - 1)}
        />
        <i
          className="fas fa-chevron-right pointer"
          onClick={() =>
            paginationOptions.page >= paginationOptions.total / paginationOptions.pageSize - 1 ||
            paginationOptions.goToPage(paginationOptions.page + 1)
          }
        />
      </div>
    )}
  </div>
);

Table.defaultProps = {
  className: '',
  alignRight: false,
  emptyText: '(Vide)',
  pagination: false,
  paginationOptions: {},
  onRowClicked: () => {},
};

export default Table;
