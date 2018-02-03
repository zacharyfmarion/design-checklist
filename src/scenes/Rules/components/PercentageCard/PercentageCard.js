import * as React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { shadow } from 'constants/styles';

const Percent = ({ percent }) =>
  <div>
    <BigNumber>
      {Math.round(percent, 1)}
    </BigNumber>
    <SuperScript>%</SuperScript>
  </div>;

const PercentageCard = ({ className, percent, title }) =>
  <RatingCard title={title} percent={percent}>
    <Percent percent={percent} />
  </RatingCard>;

const SuperScript = styled.span`
  vertical-align: top;
  line-height: 2em;
  font-size: 6em;
`;

const BigNumber = styled.span`font-size: 10em;`;

const RatingCard = styled(Card)`
  border-radius: 5px;
  border: none !important;
  background: ${({ percent }) =>
    percent > 90 ? 'rgb(185, 244, 188)' : percent > 75 ? '#fdd75f' : '#e63e3e'};
  color: ${({ percent }) =>
    percent > 90 ? '#24b47e' : percent > 75 ? '#b37e35' : '#771515'} !important;
  box-shadow: ${shadow};
  &:hover {
    box-shadow: ${shadow} !important;
  }
  .ant-card-head {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: 4em;
    text-align: center;
    height: none;
    background: inherit;
    border: none;
    text-align: left;
    .ant-card-head-title {
      font-size: 1.5rem;
      text-transform: uppercase;
      color: inherit;
      margin-top: 10px;
    }
  }
  .ant-card-body: {
    padding-top: 0;
  }
`;

export default PercentageCard;
