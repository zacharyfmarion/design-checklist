import * as React from 'react';
import styled from 'styled-components';
import { Select, Popover } from 'antd';
import { observer, inject } from 'mobx-react';
import { themeColors } from 'constants/styles';
import { Flex } from 'reflexbox';
import Button from 'components/Button';

const Option = Select.Option;

@observer
class Settings extends React.Component<Props> {
  renderContent = () => {
    const { app } = this.props;
    const activeColor = themeColors.find(
      theme => theme.color === app.primaryColor
    );
    return (
      <Flex column>
        <Header primary={app.primaryColor}>Theme</Header>
        <ThemeSelect
          defaultValue={activeColor ? activeColor.color : 'custom'}
          onChange={app.changeTheme}
        >
          {themeColors.map((theme, i) =>
            <Option value={theme.color} key={i}>
              <ColorSwab color={theme.color} />
              <span>
                {theme.title}
              </span>
            </Option>
          )}
        </ThemeSelect>
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
