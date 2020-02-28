import React from 'react';

export type ButtonEvent = React.SyntheticEvent<HTMLButtonElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type ElementEvent = React.SyntheticEvent<HTMLElement>;
export type HandlerReturn = Promise<void> | void;
