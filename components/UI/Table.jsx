import React from 'react';
import PropTypes from 'prop-types';

import './Table.css';

/**
 * Displays a data table
 */
const Table = ({ columns, dataSource, className }) => {
  return (
    <div className={`table ${className}`}>
      <table>
        <thead>
          <tr className="table-header">
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row, i) => (
            <tr key={row.key || i}>
              {columns.map((column) => (
                <td key={row.key + row[column.key]}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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
   * The class to apply to the container
   */
  className: PropTypes.string,
};

Table.defaultProps = {
  className: '',
};

export default Table;