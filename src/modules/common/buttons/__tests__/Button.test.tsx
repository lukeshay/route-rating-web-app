import React from 'react';
import Button, { IButtonProps } from '../Button';
import { mount } from '../../../../../configs/setupEnzyme';
import MUIButton from '@material-ui/core/Button';

describe('Button', () => {
  let wrapper;

  const handleClick = jest.fn();

  const buttonProps: IButtonProps = {
    id: 'wrapper',
    color: 'primary',
    size: 'medium',
    onClick: handleClick,
  };

  beforeEach(() => {
    wrapper = mount(<Button {...buttonProps} />);
  });

  it('should have correct props.', function() {
    const muiButton = wrapper.find(MUIButton);

    expect(muiButton).toBeDefined();
    expect(muiButton.props().id).toEqual(buttonProps.id);
    expect(muiButton.props().color).toEqual(buttonProps.color);
    expect(muiButton.props().size).toEqual(buttonProps.size);
    expect(muiButton.props().variant).toEqual('contained');
    expect(muiButton.props().type).toEqual('button');
    expect(muiButton.props().fullWidth).toEqual(true);
  });

  it('should trigger handleClick.', function() {
    wrapper.simulate('click');

    expect(handleClick).toBeCalledTimes(1);
  });
});
