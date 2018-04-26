// @flow
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
  /** Function handler for when the modal is closed */
  onClose: Function,
  /** Error didn't */
  fromError?: boolean,
};

/**
 * Modal that displays a tutorial about how to use the application
 */
class TutorialModal extends React.Component<Props> {
  render() {
    const { onClose, fromError } = this.props;
    return (
      <Modal onClose={onClose}>
        <ModalHeader title={fromError ? 'Project not Found' : 'Help'} />
        <ModalBody>
          <p>
            {fromError && "We couldn't find your project. "}You will need to
            have both a <Mono>pom.xml</Mono> and
            <Mono>.gitlab-ci.yml</Mono> in the root directory of your project.
            Both files are displayed below. Remember to replace{' '}
            <i>YOUR_PROJECT_NAME</i> in <Mono>pom.xml</Mono> with the unique
            name of your project. The analysis begins when a commit is pushed to
            the master branch on Gitlab, and can take up to 10 minutes to
            complete. If you are just exploring this tool and do not have a
            project, you can use the example project{' '}
            <Mono>
              <strong>test</strong>
            </Mono>.
          </p>
          <CodeTabs defaultActiveKey={'0'}>
            {files.map((file, i) => (
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
            ))}
          </CodeTabs>
        </ModalBody>
      </Modal>
    );
  }
}

const Mono = styled.span`
  font-family: monospace;
`;

const CodeTabs = styled(Tabs)`
  .ant-tabs-bar {
    margin-bottom: 0;
  }
`;

export default TutorialModal;
