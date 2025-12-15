import React from 'react';
import type {KeyboardEvent} from 'react';

import {Item} from '../Item';
import type {TabProps} from '../../types';
import styles from '../../Tabs.module.scss';

export interface ListProps {
  disclosureTabs: TabProps[];
  onClick?(id: string): void;
  onKeyPress?(event: KeyboardEvent<HTMLElement>): void;
}

export function List({
  disclosureTabs,
  onClick = noop,
  onKeyPress = noop,
}: ListProps) {
  const tabs = disclosureTabs.map(({id, content, ...tabProps}) => {
    return (
      <Item key={id} {...tabProps} id={id} onClick={onClick.bind(null, id)}>
        {content}
      </Item>
    );
  });

  return (
    <ul className={styles.List} onKeyDown={handleKeyDown} onKeyUp={onKeyPress}>
      {tabs}
    </ul>
  );
}

function noop() {}

function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
  const {key} = event;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
