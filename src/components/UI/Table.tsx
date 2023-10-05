'use client';
import styles from './Table.module.scss';
import Icon, { IconName } from '@/components/UI/Icon';

/**
 * A table component that displays data in rows and columns.
 */
const Table = ({
  columns,
  dataSource,
  className = '',
  alignRight = false,
  emptyText = '(Vide)',
  pagination = false,
  paginationOptions = null,
  onRowClicked = () => {},
}: {
  /** Title and key of each column. */
  columns: { key: string; title: string }[];
  /** Data for each row, must follow the key of each column. */
  dataSource: object[];
  /** Class of the table. */
  className?: string;
  /** Align the last column to the right. */
  alignRight?: boolean;
  /** Text to display if there is no data. */
  emptyText?: string;
  /** Set pagination for the table. */
  pagination?: boolean;
  /** Pagination options for the table. */
  paginationOptions?: {
    /** Function to execute when the user clicks on the left or right arrow. It takes 1 argument : the page number. */
    goToPage: (number: number) => void;
    /** Current page number. */
    page: number;
    /** Number of rows per page. */
    pageSize: number;
    /** Total number of rows. */
    total: number;
  } | null;
  /** Function to execute when a row is clicked. It takes 1 argument : the id of the row clicked. */
  onRowClicked?: (number: number) => void;
}) => (
  <div className={styles.tableContainer}>
    <table className={`${styles.table} ${className}`}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.length > 0 ? (
          dataSource.map((row: { [key: string]: any }, i) => (
            <tr key={`${i}`} onClick={() => onRowClicked!(i)}>
              {columns.map((column, j) => {
                const lastColumn = j + 1 === columns.length && alignRight;
                return (
                  <td key={`${row[column.key]}-${i}-${j}`} className={lastColumn ? styles.alignRight : ''}>
                    {row[column.key]}
                  </td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className={styles.tableVoid}>
              {emptyText}
            </td>
          </tr>
        )}
      </tbody>
    </table>
    {pagination && (
      <div className={styles.pagination}>
        <div onClick={() => paginationOptions!.page < 1 || paginationOptions!.goToPage(paginationOptions!.page - 1)}>
          <Icon name={IconName.ChevronLeft} />
        </div>
        <span>
          Page {paginationOptions!.page + 1} / {Math.ceil(paginationOptions!.total / paginationOptions!.pageSize)}
        </span>
        <div
          onClick={() =>
            paginationOptions!.page >= paginationOptions!.total / paginationOptions!.pageSize - 1 ||
            paginationOptions!.goToPage(paginationOptions!.page + 1)
          }>
          <Icon name={IconName.ChevronRight} />
        </div>
      </div>
    )}
  </div>
);

export default Table;
