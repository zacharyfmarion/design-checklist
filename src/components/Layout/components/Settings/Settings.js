// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Select, Popover } from 'antd';
import { observer, inject } from 'mobx-react';
import { themeColors } from 'constants/styles';
import { validHex } from 'helpers/colors';
import { Flex } from 'reflexbox';
import AppStore from 'stores/AppStore';
import Button from 'components/Button';
import Input from 'components/Input';

const Option = Select.Option;

type Props = {
  app: AppStore,
};

type State = {
  customHex: string,
};

@observer
class Settings extends React.Component<Props, State> {
  state = {
    customHex: '',
  };

  handleCustomHexChange = (value: string) => {
    this.setState({
      customHex: value,
    });
  };

  renderContent = () => {
    const { app } = this.props;
    const activeColor = themeColors.find(
      theme => theme.color === app.primaryColor,
    );
    const changeCustom = () => app.changeTheme(this.state.customHex);
    return (
      <Flex column>
        <Header primary={app.primaryColor}>Theme</Header>
        <ThemeSelect
          value={activeColor ? activeColor.color : 'custom'}
          onChange={app.changeTheme}
        >
          {themeColors.map((theme, i) => (
            <Option value={theme.color} key={i}>
              <ColorSwab color={theme.color} />
              <span>{theme.title}</span>
            </Option>
          ))}
          {!activeColor && (
            <Option value="custom" key={100}>
              <ColorSwab color={app.primaryColor} />
              <span>Custom</span>
            </Option>
          )}
        </ThemeSelect>
        <Header primary={app.primaryColor}>Custom Theme</Header>
        <HexInput
          placeholder="Hex string"
          onChange={this.handleCustomHexChange}
          action={
            <InputAction
              icon="arrow-right"
              onClick={changeCustom}
              disabled={!validHex(this.state.customHex)}
            />
          }
        />
      </Flex>
    );
  };
  render() {
    return (
      <Popover
        content={this.renderContent()}
        title="App Settings"
        trigger="click"
        placement="bottomRight"
      >
        <SettingsButton primary icon="setting" />
      </Popover>
    );
  }
}

const InputAction = styled(Button)`
  height: 29px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: none;
`;

const HexInput = styled(Input)`
  input {
    box-shadow: none;
    border: 1px solid #d9d9d9;
    padding: 3px 7px;
  }
`;

const Header = styled.h4`
  color: ${({ primary }) => primary};
  margin-bottom: 5px;
`;

const ColorSwab = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  background: ${({ color }) => color};
`;

const ThemeSelect = styled(Select)`
  flex: 1 1 auto;
  margin-bottom: 10px;
`;

const SettingsButton = styled(Button)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

export default inject('app')(Settings);
