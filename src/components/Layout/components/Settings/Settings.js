// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Select, Popover, Tooltip } from 'antd';
import { observer, inject } from 'mobx-react';
import { primaryColors, themes } from 'constants/styles';
import { validHex } from 'helpers/colors';
import { Flex } from 'reflexbox';
import AppStore from 'stores/AppStore';
import Button from 'components/Button';
import Input from 'components/Input';

const Option = Select.Option;

type Props = {
  /** Injected store so that we can access global state */
  app: AppStore,
};

type State = {
  customHex: string,
};

/**
 * Dropdown that is rendered in the `<Header />` which contains global
 * settings that the user can change. Currently this only consists of
 * the configuration of the applications current theme. Note that this
 * is cached in localstorage so that the user does not have to set the
 * theme each time they reload the page.
 */
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
    const activeColor = primaryColors.find(
      primaryColor => primaryColor.color === app.primaryColor,
    );
    const changeCustom = () => app.changePrimaryColor(this.state.customHex);
    return (
      <Flex column>
        <Header primary={app.primaryColor}>Theme</Header>
        <ThemeSelect value={app.themeName} onChange={app.changeTheme}>
          {Object.keys(themes).map((theme, i) => (
            <Option value={theme} key={i}>
              <ColorSwab bordered color={themes[theme].background} />
              <span>{theme}</span>
            </Option>
          ))}
        </ThemeSelect>
        <Header primary={app.primaryColor}>Primary Color</Header>
        <ThemeSelect
          value={activeColor ? activeColor.color : 'custom'}
          onChange={app.changePrimaryColor}
        >
          {primaryColors.map((primaryColor, i) => (
            <Option value={primaryColor.color} key={i}>
              <ColorSwab color={primaryColor.color} />
              <span>{primaryColor.title}</span>
            </Option>
          ))}
          {!activeColor && (
            <Option value="custom" key={100}>
              <ColorSwab color={app.primaryColor} />
              <span>Custom</span>
            </Option>
          )}
        </ThemeSelect>
        <Header primary={app.primaryColor}>Custom Primary Color</Header>
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
      <Tooltip placement="bottom" title="Settings">
        <Popover
          content={this.renderContent()}
          title="App Settings"
          trigger="click"
          placement="bottomRight"
        >
          <SettingsButton primary icon="setting" />
        </Popover>
      </Tooltip>
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
  border: ${({ bordered }) => (bordered ? '1px solid #000' : 'none')};
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
