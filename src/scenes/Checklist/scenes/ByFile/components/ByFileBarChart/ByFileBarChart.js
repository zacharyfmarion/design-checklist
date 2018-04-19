import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { colorSeverity } from 'helpers/colors';

type Props = {
  data: Array<Object>,
};

@observer
class ByFileBarChart extends React.Component<Props> {
  handleClick = (data, index) => {
    const { onExpand } = this.props;
    onExpand(data.name);
  };

  render() {
    const { app, data } = this.props;
    const colors = colorSeverity(data.map(item => item.numIssues));
    return (
      <ResponsiveContainer>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            name="Number of Issues"
            dataKey="numIssues"
            fill={app.primaryColor}
            onClick={this.handleClick}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
export default inject('app')(ByFileBarChart);
