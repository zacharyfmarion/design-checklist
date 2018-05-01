// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { shadeColor } from 'helpers/colors';
import { Progress, Rate } from 'antd';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import { colors } from 'constants/styles';
import UiStore from 'stores/UiStore';
import AppStore from 'stores/AppStore';

type Props = {
  /** The category string, e.g. "Code Smells" */
  category: string,
  /** Number representing how well the user is doing for the category */
  percent: number,
  /** Whether or not the category is currently selected */
  active: boolean,
  /** Click handler for the function, which should change the active prop to true */
  onClick: Function,
  /**
   * Number of issues, to be displayed in the top right. Note that
   * this number is updated when a filter is applied from the
   * `<FilterMenu />` component
   */
  numIssues: number,
  /** Ui store for responsivity */
  ui: UiStore,
  /** App store for global application state */
  app: AppStore,
};

// Map a percentage to a number stars and color
const percentMappings = (percent: number) => {
  if (percent === 100) {
    return { stars: 5, color: colors.good };
  } else if (percent < 100 && percent >= 90) {
    return { stars: 4, color: colors.average };
  } else if (percent < 90 && percent >= 80) {
    return { stars: 3, color: colors.average };
  } else if (percent < 80 && percent >= 70) {
    return { stars: 2, color: colors.bad };
  }
  return { stars: 1, color: colors.terrible };
};

/**
 * Component to display how well the user is doing for a given category.
 * Note that originally it displayed the percentage directly but now it
 * displays a series of 5 stars to display how well the repository is doing
 * for each category.
 */
const PercentageCard = ({
  percent,
  active,
  category,
  onClick,
  numIssues,
  ui,
  app,
}: Props) => {
  const mapping = percentMappings(percent);
  const categoryTitle = (
    <CategoryTitle active={active} theme={app.theme}>
      {category}
    </CategoryTitle>
  );
  return (
    <PercentContainer
      auto
      column
      active={active}
      isDesktop={ui.isDesktop}
      justify="center"
      align={ui.isDesktop ? 'center' : 'flex-start'}
      onClick={onClick}
      activeColor={shadeColor(app.primaryColor, 0.5)}
      themeName={app.themeName}
      theme={app.theme}
    >
      {!ui.isDesktop && categoryTitle}
      <ProgressWrapper column justify="center" align="center">
        <StyledProgress
          type={ui.isDesktop ? 'circle' : 'line'}
          isDesktop={ui.isDesktop}
          percent={percent}
          color={mapping.color}
        />
        {percent < 100 &&
          ui.isDesktop && (
            <StyledRate
              disabled
              defaultValue={mapping.stars}
              color={mapping.color}
            />
          )}
        {ui.isDesktop &&
          numIssues > 0 && (
            <NumIssues borderColor={app.primaryColor}>{numIssues}</NumIssues>
          )}
      </ProgressWrapper>
      {ui.isDesktop && categoryTitle}
    </PercentContainer>
  );
};

const NumIssues = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  margin-top: -8px;
  width: 31px;
  text-align: center;
  border: 1px solid ${({ borderColor }) => borderColor};
  font-size: 15px;
  border-radius: 2px;
`;

const StyledRate = styled(Rate)`
  position: absolute;
  .ant-rate-star {
    margin: 0;
  }
  .ant-rate-star-full .anticon-star {
    color: ${({ color }) => color};
  }
`;

const ProgressWrapper = styled(Flex)`
  position: relative;
  width: 100%;
`;

const StyledProgress = styled(Progress)`
  .ant-progress-text {
    ${({ percent, isDesktop }) =>
      percent < 100 && isDesktop && `display: none`};
  }
  .ant-progress-circle-path {
    stroke: ${({ color }) => color};
  }
  .ant-progress-bg {
    background: ${({ color }) => color};
  }
`;

const CategoryTitle = styled.h2`
  margin-top: 5px;
  color: ${({ theme }) => theme.color};
`;

const PercentContainer = styled(Flex)`
  cursor: pointer;
  ${({ isDesktop, active, theme, themeName, activeColor }) =>
    isDesktop
      ? `
  background: ${theme.background};
  color: ${theme.color};
  border-radius: 5px;
  box-shadow: ${theme.shadow};
  margin: 0 10px;
  padding: 15px 0;
  ${active &&
    `
    box-shadow: 0 15px 15px rgba(50,50,93,0.2), 0 5px 15px rgba(0,0,0,.4);
    border: 1px solid black;
    background: ${activeColor};
  `} 
  `
      : `
    padding: 0 10px 5px 10px;
    ${active &&
      `
      background: ${
        themeName === 'light' ? '#e8e8e8' : theme.backgroundSecondary
      };
    `}
  `};
`;

export default inject('ui', 'app')(observer(PercentageCard));
