import * as React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'brace/mode/xml';
import 'brace/mode/yaml';
import 'brace/theme/github';
import Modal, { ModalHeader, ModalBody } from 'components/Modal';
import files from './files';

const TabPane = Tabs.TabPane;

type Props = {
  onClose: Function
};

class TutorialModal extends React.Component<Props> {
  render() {
    const { onClose } = this.props;
    return (
      <Modal onClose={onClose}>
        <ModalHeader title="Project not Found" />
        <ModalBody>
          <p>
            We couldn't find your project. You will need to have both a{' '}
            <Mono>pom.xml</Mono> and
            <Mono>.gitlab-ci.yml</Mono> in the root directory of your project.
            Both files are displayed below. The analysis begins when a commit is
            pushed to the master branch on Gitlab, and can take up to 10 minutes
            to complete.
          </p>
          <CodeTabs defaultActiveKey={'0'}>
            {files.map((file, i) =>
              <TabPane tab={file.name} key={`${i}`}>
                <AceEditor
                  mode={file.mode}
                  theme="github"
                  width="100%"
                  height="300px"
                  readOnly
                  name={file.name}
                  value={file.code}
                />
              </TabPane>
            )}
          </CodeTabs>
        </ModalBody>
      </Modal>
    );
  }
}

const Mono = styled.span`font-family: monospace;`;

const CodeTabs = styled(Tabs)`
  .ant-tabs-bar {
    margin-bottom: 0;
  }
`;

export default TutorialModal;
