import { StandardProps } from '../standardProps';
import React from 'react';

export default interface ToolTipProps extends StandardProps {
  children: React.ReactElement;
  text: string;
}
