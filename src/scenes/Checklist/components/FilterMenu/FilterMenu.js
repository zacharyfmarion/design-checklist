// @flow
import * as React from 'react';
import { Popover } from 'antd';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import Button from 'components/Button';
import Switch from 'components/Switch';
import Text from 'components/Text';

type Props = {
  ui: UiStore,
  app: AppStore,
  className?: string,
};

@observer
class FilterMenu extends React.Component<Props> {
  renderMenu = () => {
    const { app } = this.props;
    return (
      <Flex column>
        {Object.keys(app.filters).map((severity, i) => {
          const handleChange = checked => app.changeFilter(severity, checked);
          return (
            <OptionRow justify="space-between" key={i}>
              <Text>{severity.toUpperCase()}</Text>
              <Switch checked={app.filters[severity]} onChange={handleChange} />
            </OptionRow>
          );
        })}
      </Flex>
    );
  };

  render() {
    const { ui, className } = this.props;
    return (
      <Popover
        title="Filter Issues"
        content={this.renderMenu()}
        trigger="click"
        placement="bottom"
      >
        <Button primary icon="filter" className={className}>
          {ui.isDesktop && 'Filter Issues'}
        </Button>
      </Popover>
    );
  }
}

const OptionRow = styled(Flex)`
  margin: 4px 0;
`;

export default inject('ui', 'app')(FilterMenu);
