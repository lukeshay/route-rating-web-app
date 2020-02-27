import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IToolTipProps from './toolTipProps';

const ToolTipBottom: React.FC<IToolTipProps> = ({
  children,
  className,
  id,
  text,
}): JSX.Element => (
  <Tooltip
    title={text}
    id={id}
    className={className}
    placement="bottom"
    data-testid={`${id}-tool-tip-test-id`}
  >
    {children}
  </Tooltip>
);

export default ToolTipBottom;
