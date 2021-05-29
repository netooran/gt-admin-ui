import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FunctionUtils } from 'utils/utils/utils';

const HeaderRow = ({ options, columns, isSelected, selectAll }) => {
  const [isChecked, setIsChecked] = useState(isSelected);
  const { selectable, ...restOfOptions } = options;

  const hasActions = !!Object.values(restOfOptions).some(
    FunctionUtils.identity
  );

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  return (
    <tr>
      {selectable && (
        <th>
          <input
            type="checkbox"
            aria-label="Select all"
            checked={isChecked}
            onChange={(event) => {
              setIsChecked(event.target.checked);
              selectAll(event.target.checked);
            }}
          />
        </th>
      )}
      {columns.map((column, i) => (
        <th key={i}>{column}</th>
      ))}
      {hasActions && <th>actions</th>}
    </tr>
  );
};

HeaderRow.propTypes = {
  columns: PropTypes.array.isRequired,
  isSelected: PropTypes.bool,
  selectAll: PropTypes.func,
  options: PropTypes.shape({
    selectable: PropTypes.bool,
  }),
};

export default HeaderRow;
