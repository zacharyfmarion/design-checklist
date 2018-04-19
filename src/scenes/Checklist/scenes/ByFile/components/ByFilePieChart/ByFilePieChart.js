import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import styled from 'styled-components';
import { colorSeverity } from 'helpers/colors';

type Props = {
  data: Array<Object>,
  onExpand: Function,
};

@observer
class ByFilePieChart extends React.Component<Props> {
  handleClick = (data, index) => {
    const { onExpand } = this.props;
    onExpand(data.name);
  };

  render() {
    const { app, data } = this.props;
    const colors = colorSeverity(data.map(item => item.numIssues));
    return (
      <ResponsiveContainer>
        <StyledPieChart width={800} height={400}>
          <Pie
            isAnimationActive={false}
            data={data}
            dataKey="numIssues"
            onClick={this.handleClick}
            fill={app.primaryColor}
            label
          >
            {data.map((entry, index) => <Cell fill={colors[index]} />)}
          </Pie>
          <Tooltip />
        </StyledPieChart>
      </ResponsiveContainer>
    );
  }
}

const StyledPieChart = styled(PieChart)`
  path {
    cursor: pointer !important;
  }
`;

export default inject('app')(ByFilePieChart);
