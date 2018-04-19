import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import Modal, { ModalHeader, ModalBody } from 'components/Modal';
import CodeIssue from 'components/CodeIssue';
import SuccessMessage from 'components/SuccessMessage';

type Props = {
  file: string,
  issues: Array<Object>,
  onClose: Function,
};

const DirectoryIssuesModal = ({ issues, file, onClose }: Props) => {
  if (!issues) return null;
  return (
    <Modal onClose={onClose}>
      <ModalHeader title={`Issues in ${file}`} />
      <StyledModalBody noIssues={issues.length === 0}>
        {issues.length === 0 ? (
          <SuccessContainer auto justify="center" align="center">
            <SuccessMessage message="No more issues!" />
          </SuccessContainer>
        ) : (
          issues.map(issue => <StyledCodeIssue error={issue} type="error" />)
        )}
      </StyledModalBody>
    </Modal>
  );
};

const StyledModalBody = styled(ModalBody)`
  ${({ noIssues }) =>
    noIssues
      ? `padding: 70px 0`
      : `
    padding: 20px;
    max-height: 500px;
    overflow: scroll;
  `};
`;

const SuccessContainer = styled(Flex)`
  min-width: 600px;
`;

const StyledCodeIssue = styled(CodeIssue)`
  margin-bottom: 10px;
`;

export default DirectoryIssuesModal;
