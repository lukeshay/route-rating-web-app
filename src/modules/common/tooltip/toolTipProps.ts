import { IStandardProps } from '../standardProps';
import React from 'react';

export default interface IToolTipProps extends IStandardProps {
  children: React.ReactElement;
  text: string;
}
