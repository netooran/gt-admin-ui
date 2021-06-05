import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Trash, Edit, Save } from '@styled-icons/boxicons-solid';
import ButtonGroup from 'shared/ButtonGroup/ButtonGroup';
import Button from 'shared/Button/Button';
import Input from 'shared/Input/Input';
import Checkbox from '../../Checkbox/Checkbox';

const StyledRow = styled.tr`
  :hover {
    background-color: var(--hover-bg-color);
  }

  ${({ isSelected }) =>
    isSelected && 'background-color: var(--active-bg-color);'}
`;

const Row = ({ data, columns, options, isSelected, select, save, remove }) => {
  const [rowData, setRowData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const { editable, deletable, selectable } = options || {};

  const validate = () => {
    let isValid = true;
    const validationErrors = {};
    columns.forEach(({ name, validate }) => {
      const [valid, error] = (validate && validate(rowData[name])) || [true];
      if (!valid) {
        validationErrors[name] = error;
        isValid = false;
      }
    });
    setErrors(validationErrors);
    return isValid;
  };

  const actions = [
    {
      name: isEditing ? 'Save' : 'Edit',
      icon: isEditing ? <Save /> : <Edit />,
      enabled: editable,
      onClick: () => {
        if (isEditing) {
          if (validate()) {
            save(rowData);
            setIsEditing(false);
          }
          return;
        }
        setIsEditing(true);
      },
    },
    {
      name: 'Delete',
      icon: <Trash />,
      importance: 'danger',
      enabled: deletable,
      onClick: () => remove(rowData),
    },
  ];

  const enabledActions = actions.filter(({ enabled }) => enabled);

  return (
    <StyledRow key={rowData.id} isSelected={isSelected} isEditing={isEditing}>
      {selectable && (
        <td>
          <Checkbox
            aria-label="Select row"
            checked={isSelected}
            onChange={(event) => select(rowData.id, event.target.checked)}
          />
        </td>
      )}
      {columns.map(({ name, type }, i) => (
        <td key={i}>
          <Input
            type={type}
            aria-label={name}
            initialValue={rowData[name]}
            readonly={!isEditing}
            autoFocus={isEditing && i === 0}
            onChange={(value) => setRowData({ ...rowData, [name]: value })}
            error={errors[name]}
          />
        </td>
      ))}
      <td>
        <ButtonGroup>
          {enabledActions.map(({ name, icon, importance, onClick }, i) => (
            <Button
              key={i}
              aria-label={name}
              variant="icon"
              importance={importance}
              onClick={onClick}
            >
              {icon}
            </Button>
          ))}
        </ButtonGroup>
      </td>
    </StyledRow>
  );
};

Row.propTypes = {
  data: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.shape({
    editable: PropTypes.bool,
    deletable: PropTypes.bool,
    selectable: PropTypes.bool,
  }),
  isSelected: PropTypes.bool,
  select: PropTypes.func,
  save: PropTypes.func,
  remove: PropTypes.func,
};

export default Row;
