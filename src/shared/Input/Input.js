import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Row } from '../Containers/Containers';
import { ErrorCircle } from '@styled-icons/boxicons-solid';
import Tooltip from '../Tooltip/Tooltip';

const readonlyStyles = css`
  background-color: transparent;
  pointer-events: none;
`;

const Wrapper = styled(Row)`
  justify-content: space-between;
  border: 1px solid ${({ readonly }) => (readonly ? 'transparent' : '#d8d8d8')};
  border-radius: 0.2rem;
  background-color: white;
  min-width: 250px;

  :focus-within {
    border: 1px solid #1890ff;
  }

  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ readonly }) => readonly && readonlyStyles}
  ${({ error }) => error && 'border: 1px solid red;'}

  svg {
    fill: red;
    width: 1.2rem;
    padding: 0 0.5rem;
  }
`;

const StyledInput = styled.input`
  border-style: none;
  border-radius: 0.2rem;
  padding: 0.5rem;
  width: 100%;

  :focus {
    outline: none;
  }

  :disabled {
    color: inherit;
    ${readonlyStyles}
  }
`;

const Input = ({
  initialValue = '',
  type = 'text',
  error,
  autoFocus,
  role = 'textbox',
  readonly,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const ref = useRef(null);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    if (ref.current && autoFocus) {
      ref.current.focus();
      ref.current.select();
    }
  }, [ref.current, autoFocus]);

  return (
    <Wrapper error={!!error} readonly={readonly} {...props}>
      <StyledInput
        ref={ref}
        type={type}
        role={role}
        value={value}
        disabled={readonly}
        onChange={(event) => setValue(event.target.value)}
        {...props}
      />
      {error && (
        <Tooltip message={error} showTooltipOnLoad>
          <ErrorCircle />
        </Tooltip>
      )}
    </Wrapper>
  );
};

Input.propTypes = {
  initialValue: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  role: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
