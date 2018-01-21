import * as React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { Flex } from 'reflexbox';

type Props = {
  onChange: Function,
  value: string,
  icon?: string,
  size?: 'normal' | 'large',
  onEnter?: Function,
  placeholder?: string,
  className?: string
};

const fontSizes = {
  normal: '14px',
  large: '20px'
};

class Input extends React.Component<Props> {
  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter' && !!this.props.onEnter) {
      this.props.onEnter();
    }
  };

  render() {
    const { value, icon, placeholder, size = 'normal', className } = this.props;
    return (
      <InputContainer className={className}>
        {icon &&
          <IconContainer justify="center" align="center">
            <StyledIcon type={icon} size={size} />
          </IconContainer>}
        <StyledInput
          type="text"
          hasIcon={!!icon}
          size={size}
          onKeyPress={this.handleKeyPress}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          className="input-instance"
        />
      </InputContainer>
    );
  }
}

const IconContainer = styled(Flex)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`;

const InputContainer = styled.div`position: relative;`;

const StyledIcon = styled(Icon)`
  font-size: 19px;
  padding: ${({ size }) => (size === 'large' ? '0 10px' : '0 5px')};
`;

const StyledInput = styled.input`
  border-radius: 3px;
  padding: 10px;
  border: none;
  font-family: Roboto;
  font-size: ${({ size }) => fontSizes[size]};
  box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
  ${({ hasIcon, size }) =>
    hasIcon &&
    (size === 'large' ? `padding-left: 40px;` : `padding-left: 30px;`)};
`;

export default Input;
