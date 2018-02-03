import * as React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import Modal, { ModalHeader, ModalBody } from 'components/Modal';
import Code from 'components/Code';
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
        <ModalHeader title="Tutorial" />
        <ModalBody>
          <p>
            You will need to have both a <Mono>pom.xml</Mono> and
            <Mono>.gitlab-ci.yml</Mono> in the root directory of your project.
            Both files are displayed below.
          </p>
          <CodeTabs defaultActiveKey={'0'}>
            {files.map((file, i) =>
              <TabPane tab={file.name} key={`${i}`}>
                <FileCode lines={file.code.split('\n')} />
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

const FileCode = styled(Code)`
  // max-height: 400px;
  // overflow: scroll;
`;

export default TutorialModal;
