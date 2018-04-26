// @flow

/**
 * Menu that allows the user to filter issues by their level of severity. This
 * lets users ignore small issues and focus on the most critical fixes without
 * the distraction
 */

import * as React from 'react';
import { Popover, Tooltip } from 'antd';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';
import Button from 'components/Button';
import Switch from 'components/Switch';
import Text from 'components/Text';

type Props = {
  /** Ui store for responsivity */
  ui: UiStore,
  /** App store for global application state */
  app: AppStore,
  className?: string,
};

/**
 * Component that allows users to filter issues based on severity level. It
 * is rendered as a header action in the `<Checklist />` component.
 */
@observer
class FilterMenu extends React.Component<Props> {
  /**
   * Render the menu that will be displayed when the user selects the filter
   * menu button. The menu just consists of a series of `<Switch />` components
   * noting whether or not the severity level is currently active
   */
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
    const { className } = this.props;
    return (
      <Tooltip placement="bottom" title="Filter Issues">
        <Popover
          title="Filter Issues"
          content={this.renderMenu()}
          trigger="click"
          placement="bottom"
        >
          <Button primary icon="filter" className={className} />
        </Popover>
      </Tooltip>
    );
  }
}

const OptionRow = styled(Flex)`
  margin: 4px 0;
`;

export default inject('ui', 'app')(FilterMenu);
