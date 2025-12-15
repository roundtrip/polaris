import type {ReactNode} from 'react';
import React, {memo} from 'react';

import {classNames} from '../../../../utilities/css';
import {UnstyledLink} from '../../../UnstyledLink';
import styles from '../../Tabs.module.scss';

export interface ItemProps {
  id: string;
  children?: ReactNode;
  url?: string;
  accessibilityLabel?: string;
  onClick?(): void;
}
export const Item = memo(function Item({
  id,
  children,
  url,
  accessibilityLabel,
  onClick = noop,
}: ItemProps) {
  const classname = classNames(styles.Item);

  const sharedProps = {
    id,
    onClick,
    className: classname,
    'aria-selected': false,
    'aria-label': accessibilityLabel,
  };

  const markup = url ? (
    <UnstyledLink {...sharedProps} url={url}>
      {children}
    </UnstyledLink>
  ) : (
    <button {...sharedProps} type="button">
      {children}
    </button>
  );

  return <li>{markup}</li>;
});

function noop() {}
