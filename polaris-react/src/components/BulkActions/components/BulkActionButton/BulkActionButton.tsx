import React, {useRef} from 'react';
import {MenuHorizontalIcon} from '@shopify/polaris-icons';

import type {
  DestructableAction,
  DisableableAction,
  LoadableAction,
  PrimaryAction,
} from '../../../../types';
import type {ButtonProps} from '../../../Button';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Indicator} from '../../../Indicator';
import {Tooltip} from '../../../Tooltip';
import {useComponentDidMount} from '../../../../utilities/use-component-did-mount';
import styles from '../../BulkActions.module.css';

export type BulkActionButtonProps = {
  disclosure?: boolean;
  indicator?: boolean;
  handleMeasurement?(width: number): void;
  showContentInButton?: boolean;
  size?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
} & DisableableAction &
  DestructableAction &
  PrimaryAction &
  LoadableAction;

export function BulkActionButton({
  handleMeasurement,
  url,
  external,
  onAction,
  content,
  disclosure,
  accessibilityLabel,
  disabled,
  destructive,
  indicator,
  showContentInButton,
  size,
  primary,
  loading,
}: BulkActionButtonProps) {
  const bulkActionButton = useRef<HTMLDivElement>(null);

  useComponentDidMount(() => {
    if (handleMeasurement && bulkActionButton.current) {
      const width = bulkActionButton.current.getBoundingClientRect().width;
      handleMeasurement(width);
    }
  });

  const isActivatorForMoreActionsPopover = disclosure && !showContentInButton;

  const buttonContent = isActivatorForMoreActionsPopover ? undefined : content;

  const buttonMarkup = (
    <Button
      external={external}
      url={url}
      accessibilityLabel={
        isActivatorForMoreActionsPopover ? content : accessibilityLabel
      }
      tone={destructive ? 'critical' : undefined}
      disclosure={disclosure && showContentInButton}
      onClick={onAction}
      disabled={disabled}
      size={size}
      icon={
        isActivatorForMoreActionsPopover ? (
          <Icon source={MenuHorizontalIcon} tone="base" />
        ) : undefined
      }
      variant={primary ? 'primary' : undefined}
      loading={loading}
    >
      {buttonContent}
    </Button>
  );

  return (
    <div className={styles.BulkActionButton} ref={bulkActionButton}>
      {isActivatorForMoreActionsPopover ? (
        <Tooltip content={content} preferredPosition="below">
          {buttonMarkup}
        </Tooltip>
      ) : (
        buttonMarkup
      )}
      {indicator && <Indicator />}
    </div>
  );
}
