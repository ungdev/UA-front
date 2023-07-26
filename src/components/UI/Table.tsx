'use client';
import Divider from './Divider';

/**
 * A table component that displays data in rows and columns.
 * @param columns - Title and key of each column.
 * @param dataSource - Data for each row, must follow the key of each column.
 * @param className - Class of the table.
 * @param alignRight - Align the last column to the right.
 * @param emptyText - Text to display if there is no data.
 * @param pagination - Set pagination for the table.
 * @param paginationOptions - Pagination options for the table.
 * @param paginationOptions.goToPage - Function to execute when the user clicks on the left or right arrow. It takes 1 argument : the page number.
 * @param paginationOptions.page - Current page number.
 * @param paginationOptions.pageSize - Number of rows per page.
 * @param paginationOptions.total - Total number of rows.
 * @param onRowClicked - Function to execute when a row is clicked. It takes 1 argument : the id of the row clicked.
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
  columns: { key: string; title: string }[];
  dataSource: any[];
  className?: string;
  alignRight?: boolean;
  emptyText?: string;
  pagination?: boolean;
  paginationOptions?: {
    goToPage: (number: number) => void;
    page: number;
    pageSize: number;
    total: number;
  };
  onRowClicked?: (number: number) => void;
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
            <tr key={`${row.key}-${i}`} onClick={() => onRowClicked!(i)}>
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
          Page {paginationOptions!.page + 1} / {Math.ceil(paginationOptions!.total / paginationOptions!.pageSize)}
        </p>
        <i
          className="fas fa-chevron-left pointer"
          onClick={() => paginationOptions!.page < 1 || paginationOptions!.goToPage(paginationOptions!.page - 1)}
        />
        <i
          className="fas fa-chevron-right pointer"
          onClick={() =>
            paginationOptions!.page >= paginationOptions!.total / paginationOptions!.pageSize - 1 ||
            paginationOptions!.goToPage(paginationOptions!.page + 1)
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
