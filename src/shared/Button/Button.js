import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const defaultStyles = css`
  --button-primary-color: #000000;

  border: none;
  cursor: pointer;
  opacity: 0.7;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 3rem;

  svg {
    width: 1.2rem;
  }
`;

const disabledStyles = css`
  :disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const hoverStyles = css`
  :hover {
    opacity: 1;
  }
`;

const dangerStyles = css`
  --button-primary-color: red;
`;

const solidStyles = css`
  background-color: var(--button-primary-color);
  color: white;
`;

const outlineStyles = css`
  background-color: transparent;
  border: 1px solid var(--button-primary-color);
  color: var(--button-primary-color); ;
`;

const ghostStyles = css`
  background-color: transparent;
  color: var(--button-primary-color);
`;

const iconStyles = css`
  background-color: transparent;
  color: var(--button-primary-color);
  padding: 0;
`;

const roundStyles = css`
  min-width: 3rem;
  min-height: 3rem;
  padding: 0;
`;

const StyledButton = styled.button`
  ${defaultStyles}
  ${disabledStyles}
  ${hoverStyles}

  ${({ importance }) => importance === 'danger' && dangerStyles}
  ${({ variant }) => variant === 'solid' && solidStyles}
  ${({ variant }) => variant === 'ghost' && ghostStyles}
  ${({ variant }) => variant === 'outline' && outlineStyles}
  ${({ variant }) => variant === 'icon' && iconStyles}
  ${({ shape }) => shape === 'round' && roundStyles}
`;

const Button = ({ children, variant = 'solid', ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['solid', 'outline', 'ghost', 'icon']),
  importance: PropTypes.oneOf(['danger']),
  shape: PropTypes.oneOf(['round']),
  disabled: PropTypes.bool,
};

export default Button;
