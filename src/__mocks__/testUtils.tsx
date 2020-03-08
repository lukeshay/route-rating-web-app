import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import TestComponentWrapperV2 from './TestComponentWrapperV2';
import * as TypeMocks from './typeMocks';

interface WrapperProps {
  children: React.ReactNode;
}

const SignedInDesktop: React.FC<WrapperProps> = ({ children }): JSX.Element => {
  return (
    <TestComponentWrapperV2
      gymsState={TypeMocks.mockGymsState}
      userState={TypeMocks.signedInEditorState}
      viewState={TypeMocks.darkDesktopState}
    >
      {children}
    </TestComponentWrapperV2>
  );
};

export const renderSignedInDesktop = (ui, options): RenderResult =>
  render(ui, { wrapper: SignedInDesktop, ...options });

const SignedOutDesktop: React.FC<WrapperProps> = ({
  children,
}): JSX.Element => {
  return (
    <TestComponentWrapperV2
      gymsState={TypeMocks.mockGymsState}
      userState={TypeMocks.signedOutState}
      viewState={TypeMocks.darkDesktopState}
    >
      {children}
    </TestComponentWrapperV2>
  );
};

export const renderSignedOutDesktop = (ui, options): RenderResult =>
  render(ui, { wrapper: SignedOutDesktop, ...options });

export * from '@testing-library/react';
