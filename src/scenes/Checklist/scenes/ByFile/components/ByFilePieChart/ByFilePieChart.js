import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import styled from 'styled-components';
import { colorSeverity } from 'helpers/colors';

type ChartDataItem = {
  name: string,
  numIssues: number,
};

type Props = {
  /** Data to be displayed in the graph */
  data: Array<ChartDataItem>,
  /** Function to handle when the user clicks on a a file/directory */
  onExpand: Function,
};

/**
 * Pie chart that displays the number of errors in the files or
 * subfolders inside a directory
 */
@observer
class ByFilePieChart extends React.Component<Props> {
  /**
   * Handle a bar being clicked by the user
   * @param {ChartDataItem} data The data item corresponding to the bar that
   * was clicked
   */
  handleClick = (data: ChartDataItem) => {
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
