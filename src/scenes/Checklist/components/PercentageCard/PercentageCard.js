import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { shadeColor } from 'helpers/colors';
import { Progress, Rate } from 'antd';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import { colors, shadow } from 'constants/styles';

const numberOfStars = percent => {
  if (percent === 100) {
    return 5;
  } else if (percent < 100 && percent >= 90) {
    return 4;
  } else if (percent < 90 && percent >= 80) {
    return 3;
  } else if (percent < 80 && percent >= 70) {
    return 2;
  }
  return 1;
};

const PercentageCard = ({ percent, active, category, onClick, ui, app }) => {
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
      {!ui.isDesktop &&
        <CategoryTitle active={active}>
          {category}
        </CategoryTitle>}
      <ProgressWrapper column justify="center" align="center">
        <StyledProgress
          type={ui.isDesktop ? 'circle' : 'line'}
          isDesktop={ui.isDesktop}
          percent={percent}
        />
        {percent < 100 &&
          ui.isDesktop &&
          <StyledRate
            disabled
            defaultValue={numberOfStars(percent)}
            colorThreshold={percent}
          />}
      </ProgressWrapper>
      {ui.isDesktop &&
        <CategoryTitle active={active}>
          {category}
        </CategoryTitle>}
    </PercentContainer>
  );
};

const StyledRate = styled(Rate)`
  position: absolute;
  .ant-rate-star {
    margin: 0;
  }
  .ant-rate-star-full .anticon-star {
    color: ${({ colorThreshold }) =>
      colorThreshold < 100
        ? colorThreshold >= 70 ? colors.average : colors.bad
        : colors.good};
  }
`;

const ProgressWrapper = styled(Flex)`position: relative; width: 100%;`;

const StyledProgress = styled(Progress)`
  .ant-progress-text {
    ${({ percent, isDesktop }) =>
      percent < 100 && isDesktop && `display: none`};
  }
  .ant-progress-circle-path {
    stroke: ${({ percent }) =>
      percent < 100
        ? percent >= 70 ? colors.average : colors.bad
        : colors.good}
  }
  .ant-progress-bg {
    background: ${({ percent }) =>
      percent < 100
        ? percent >= 70 ? colors.average : colors.bad
        : colors.good};
  }
`;

const CategoryTitle = styled.h2`margin-top: 5px;`;

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
  `}
`;

export default inject('ui', 'app')(observer(PercentageCard));
