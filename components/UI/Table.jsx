import React from 'react';
import PropTypes from 'prop-types';

import './Table.css';

/**
 * Displays a table
 */
const Table = ({ columns, dataSource, className, alignRight, emptyText }) => (
  <div className="table-container">
    <table className={`table ${className}`}>
      <thead>
        <tr className="table-header">
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
        <tr>
          <td className="table-divider" colSpan={columns.length} />
        </tr>
      </thead>
      <tbody>
        { dataSource.length > 0
          ? dataSource.map((row, i) => (
            <tr key={`${row.key}-${i}`}>
              {columns.map((column, j) => {
                const lastColumn = (j+1) === columns.length && alignRight;
                return (<td key={`${row[column.key]}-${i}${j}`} className={lastColumn ? 'align-right' : ''}>{row[column.key]}</td>);
              })}
            </tr>
          ))
          : <tr><td colSpan={columns.length} className="table-void">{emptyText}</td></tr>
        }
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  /**
   * Title and key of each column
   */
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.any.isRequired,
  })).isRequired,
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
};

Table.defaultProps = {
  className: '',
  alignRight: false,
  emptyText: '(Vide)',
};

export default Table;