import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Treemap, ResponsiveContainer } from 'recharts';
import { colorSeverity } from 'helpers/colors';
import styled from 'styled-components';

type Props = {
  data: Array<Object>,
  // change the data when the user expands a section
  onExpand: Function,
  // Function determining whether the user can expand further
  canExpand: Function,
};

type CustomizedContentProps = {
  root: React.Node,
  depth: number,
  x: number,
  y: number,
  width: number,
  height: number,
  index: number,
  payload: any, // idk what this is
  colors: Array<string>,
  rank: number,
  name: string,
  data: Array<Object>,
  onExpand: Function,
  canExpand: Function,
};

// helper function to get filename
const getFilename = (name: string): string => {
  const shortName = /[^/]*$/.exec(name)[0];
  return shortName.indexOf('.') > -1 ? shortName : shortName + '/';
};

const CustomizedContent = ({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  payload,
  colors,
  rank,
  name,
  data,
  onExpand,
  canExpand,
}: CustomizedContentProps) => {
  const handleExpand = () => onExpand(name);
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? colors[index] : 'none',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
          cursor: 'pointer',
        }}
        onClick={handleExpand}
      />
      {depth === 1 ? (
        <NameText
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          onClick={handleExpand}
        >
          {getFilename(name)}
        </NameText>
      ) : null}
      {depth === 1 ? (
        <g>
          {canExpand(name) && (
            <ExpandSvg
              x={x + 4}
              y={y + 18}
              fill="#fff"
              fontSize={14}
              fillOpacity={0.9}
            >
              +
            </ExpandSvg>
          )}
          <text
            x={x + (canExpand(name) ? 25 : 4)}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {data.find(item => item.name === name).size}
          </text>
        </g>
      ) : null}
    </g>
  );
};

@observer
class ByFileTreemap extends React.Component<Props> {
  render() {
    const { app, onExpand, canExpand, data } = this.props;
    if (!data || data.constructor !== Array) return null;
    const colors = colorSeverity(data.map(item => item.size));
    return (
      <ResponsiveContainer>
        <Treemap
          width={400}
          height={200}
          data={data}
          dataKey="size"
          ratio={4 / 3}
          stroke="#fff"
          fill={app.primaryColor}
          content={
            <CustomizedContent
              colors={colors}
              data={data}
              onExpand={onExpand}
              canExpand={canExpand}
            />
          }
        />
      </ResponsiveContainer>
    );
  }
}

const NameText = styled.text`
  cursor: pointer;
`;

const ExpandSvg = styled.text`
  cursor: pointer;
`;

export default inject('app')(ByFileTreemap);
