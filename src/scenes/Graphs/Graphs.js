import * as React from 'react';
import Layout from 'components/Layout';
import Input from 'components/Input';
import styled from 'styled-components';

class Graphs extends React.Component<{}> {
  state = {
    value: ''
  };

  handleInputChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <Layout>
        <div>
          <SearchInput
            onChange={this.handleInputChange}
            value={this.state.value}
            placeholder="Search..."
            icon="search"
            size="large"
          />
        </div>
      </Layout>
    );
  }
}

const SearchInput = styled(Input)`
  .input-instance {
    width: 350px;
  }
`;

export default Graphs;
