// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { shadeColor } from 'helpers/colors';
import { Progress, Rate } from 'antd';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import { colors, shadow } from 'constants/styles';

const percentMappings = percent => {
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

const PercentageCard = ({
  percent,
  active,
  category,
  onClick,
  numIssues,
  ui,
  app,
}) => {
  const mapping = percentMappings(percent);
  const categoryTitle = (
    <CategoryTitle active={active}>{category}</CategoryTitle>
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
        {ui.isDesktop > 0 && (
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
`;

const PercentContainer = styled(Flex)`
  cursor: pointer;
  ${({ isDesktop, active, activeColor }) =>
    isDesktop
      ? `
  background: #fff;
  border-radius: 5px;
  box-shadow: ${shadow};
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
      background: #e8e8e8;
    `}
  `};
`;

export default inject('ui', 'app')(observer(PercentageCard));
