import { StyledButton, StyledSecondaryButton, ButtonContainer } from '../styles/Button.styles';

const Button = ({ children, onClick, variant = 'primary', as: Component = 'button', ...props }) => {
  const ButtonComponent = variant === 'secondary' ? StyledSecondaryButton : StyledButton;
  return (
    <ButtonComponent as={Component} onClick={onClick} {...props}>
      {children}
    </ButtonComponent>
  );
};

export default Button;
export { ButtonContainer };
