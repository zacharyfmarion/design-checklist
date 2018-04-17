// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import UiStore from 'stores/UiStore';
import ReactModal from 'react-modal';
import ModalHeader from './components/ModalHeader';

type Props = {
  children: React.Node,
  onClose: Function,
  ui: UiStore,
};

const modalStyles = (isMobile: boolean) => ({
  overlay: {
    position: 'fixed',
    display: 'flex',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(212, 212, 212, 0.5)',
  },
  content: {
    position: 'static',
    overflow: 'scroll',
    width: isMobile ? '100%' : '750px',
    margin: 'auto',
    border: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 36px 14px',
    background: '#fff',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '0',
  },
});

const Modal = ({ children, onClose, ui, ...otherProps }: Props) => {
  const style = modalStyles(ui.isMobile);
  return (
    <ReactModal
      isOpen
      onRequestClose={onClose}
      closeTimeoutMS={5}
      style={style}
      contentLabel="Modal"
      {...otherProps}
    >
      {React.Children.map(children, child => {
        if (child.type === ModalHeader) {
          // $FlowIssue
          return React.cloneElement(child, { onClose });
        }
        return child;
      })}
    </ReactModal>
  );
};

export { Modal };
export default inject('ui')(observer(Modal));
