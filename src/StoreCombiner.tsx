/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface StoreCombinerProps {
  stores: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
}

const StoreCombiner: React.FunctionComponent<StoreCombinerProps> = ({
  stores,
  children,
}): JSX.Element => {
  return (
    <>
      {stores.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

export default React.memo(StoreCombiner);
