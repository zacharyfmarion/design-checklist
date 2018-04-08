// @flow
import * as React from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import Modal, { ModalHeader, ModalBody } from 'components/Modal';

type Props = {
  onClose: Function,
  fromError: boolean,
};

class InfoModal extends React.Component<Props> {
  render() {
    const { onClose } = this.props;
    return (
      <Modal onClose={onClose}>
        <ModalHeader title="About the Design Checklist" />
        <ModalBody>
          <Text>
            The Design Checklist is a tool created for Duke's Compsci308 class
            in order to help students refactor their code. It analyzes Java
            projects and reports different code errors tailored to the material
            covered in the class. Specifically, these issues are broken into 5
            main categories:
          </Text>
          <UnorderedList>
            <ListItem>
              <Text>
                <strong>Communication: </strong>Is the code easy to read and
                understand?
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Modularity: </strong>Do your classes have a small,
                well-defined purpose?
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Flexibility: </strong>Does you program contain
                duplication of any kind?
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Code Smells: </strong>Code issues related to general
                good programming practices
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Java Notes: </strong>Code issues specific to Java
              </Text>
            </ListItem>
          </UnorderedList>
        </ModalBody>
      </Modal>
    );
  }
}

const UnorderedList = styled.ul`
  margin-top: 10px;
  list-style: inherit;
`;

const ListItem = styled.li`
  margin: 0px 15px;
  padding: inherit;
`;

export default InfoModal;
