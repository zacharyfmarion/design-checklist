// @flow
import * as React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Flex } from 'reflexbox';

type Props = {
  onChange: Function,
  value: string,
  icon?: string,
  size?: 'normal' | 'large',
  onEnter?: Function,
  action?: React.Node,
  placeholder?: string,
  className?: string,
};

const fontSizes = {
  normal: '14px',
  large: '20px',
};

@observer
class Input extends React.Component<Props> {
  handleChange = (event: SyntheticEvent<*>) => {
    const { target } = event;
    if (!(target instanceof window.HTMLInputElement)) return;
    this.props.onChange(target.value);
  };

  handleKeyPress = (e: Event) => {
    if (e.key === 'Enter' && !!this.props.onEnter) {
      this.props.onEnter();
    }
  };

  render() {
    const {
      value,
      icon,
      action,
      placeholder,
      app,
      size = 'normal',
      className,
    } = this.props;
    return (
      <InputContainer className={className}>
        {icon && (
          <IconContainer justify="center" align="center">
            <StyledIcon type={icon} size={size} />
          </IconContainer>
        )}
        <StyledInput
          type="text"
          hasIcon={!!icon}
          size={size}
          onKeyPress={this.handleKeyPress}
          value={value}
          shadow={app.theme.shadow}
          placeholder={placeholder}
          onChange={this.handleChange}
          className="input-instance"
        />
        {action && <ActionContainer>{action}</ActionContainer>}
      </InputContainer>
    );
  }
}

const ActionContainer = styled(Flex)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

const IconContainer = styled(Flex)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`;

const InputContainer = styled.div`
  position: relative;
`;

const StyledIcon = styled(Icon)`
  font-size: 19px;
  color: gray;
  padding: ${({ size }) => (size === 'large' ? '0 10px' : '0 5px')};
`;

const StyledInput = styled.input`
  border-radius: 3px;
  padding: 10px;
  border: none;
  font-family: Roboto;
  color: black;
  font-size: ${({ size }) => fontSizes[size]};
  box-shadow: ${({ shadow }) => shadow};
  ${({ hasIcon, size }) =>
    hasIcon &&
    (size === 'large' ? `padding-left: 40px;` : `padding-left: 30px;`)};
`;

export default inject('app')(Input);
