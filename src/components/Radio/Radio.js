import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Radio as AntRadio } from 'antd';
import styled from 'styled-components';
import AppStore from 'stores/AppStore';

const AntRadioGroup = AntRadio.Group;
const RadioButton = AntRadio.Button;

type Props = {
  app: AppStore,
};

const RadioGroup = inject('app')(
  observer(({ app, children, ...props }: Props) => {
    return (
      <StyledAntRadioGroup
        primaryColor={app.primaryColor}
        theme={app.theme}
        {...props}
      >
        {children}
      </StyledAntRadioGroup>
    );
  }),
);

const StyledAntRadioGroup = styled(AntRadioGroup)`
  ${({ primaryColor, theme }) => `
    .ant-radio-button-wrapper:hover, .ant-radio-button-wrapper-focused {
      color: ${primaryColor};
    }
    .ant-radio-button-wrapper {
      background: ${theme.background};
      color: ${theme.color};
    }
    .ant-radio-button-wrapper-checked {
      border-color: ${primaryColor};
      color: ${primaryColor};
      box-shadow: -1px 0 0 0 ${primaryColor};
    }
    .ant-radio-button-wrapper-checked:first-child {
      border-color: ${primaryColor};
    }
  `};
`;

export { RadioGroup, RadioButton };
