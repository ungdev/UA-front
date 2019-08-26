import React from 'react';
import PropTypes from 'prop-types';

import './Table.css';

/**
 * Displays a data table
 */
const Table = ({ columns, dataSource }) => {
  const columnsKey = columns.map((column) => column.key);
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tr>
        <td colSpan={columnsKey.length}>
          <div className="divider" />
        </td>
      </tr>
      <tbody>
        {dataSource.map((row) => (
          <tr>
            {columnsKey.map((key) => (
              <td>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
};

export default Table;