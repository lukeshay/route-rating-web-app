import React from 'react';

export interface StandardProps {
  children?: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  id: string;
  name?: string;
  testId?: string;
}
