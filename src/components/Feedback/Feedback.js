import * as React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { colors } from 'constants/styles';
import Button from 'components/Button';

type Props = {};

class Feedback extends React.Component<Props> {
  handleClick = () => {
    const subject = `Design Checkup feedback`;
    const body = `Name:%0D%0A%0D%0AProject group:%0D%0A%0D%0AIssue or feedback that you would like to address:`;
    window.open(`mailto:compsci308@gmail.com?subject=${subject}&body=${body}`);
  };

  render() {
    return (
      <Tooltip placement="left" title="Send Feedback">
        <FeedbackButton icon="mail" size="large" onClick={this.handleClick} />
      </Tooltip>
    );
  }
}

const FeedbackButton = styled(Button)`
  position: fixed;
  z-index: 10;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: #fff;
  background: ${colors.primary};
`;

export default Feedback;
