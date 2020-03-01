import React from 'react';

export interface IStandardProps {
  children?: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  id: string;
  name?: string;
  testId?: string;
}
