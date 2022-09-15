import React from 'react';
import PropTypes from 'prop-types';
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

Table.propTypes = {
  /**
   * Title and key of each column
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.any.isRequired,
    }),
  ).isRequired,
  /**
   * Data for each row, must follow the key of each column
   */
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Class of the table
   */
  className: PropTypes.string,
  /**
   * Align the last column to the right
   */
  alignRight: PropTypes.bool,
  /**
   * Text to display if there is no data
   */
  emptyText: PropTypes.string,
  /**
   * Set pagination for the table
   */
  pagination: PropTypes.bool,
  /**
   *
   */
  paginationOptions: PropTypes.shape({
    goToPage: PropTypes.func,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
  }),

  /*
   * Function to execute when a row is clicked. It takes 1 argument : the id of the row clicked
   */
  onRowClicked: PropTypes.func,
};

Table.defaultProps = {
  className: '',
  alignRight: false,
  emptyText: '(Vide)',
  pagination: false,
  paginationOptions: {},
  onRowClicked: () => {},
};

export default Table;
