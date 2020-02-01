import React, { ReactNode, MouseEventHandler } from 'react'
import css from './index.module.css'
import classNames from 'classnames'

type buttonTypes = 'submit' | 'reset' | 'button'

type BaseProps = {
  className?: string,
  type?: buttonTypes,
  disabled?: boolean,
  onClick: MouseEventHandler
}

const BaseButton: React.FC<BaseProps> = ({
  className = '',
  type = 'button',
  disabled = false,
  children,
}) => (
  <button className={classNames(css.root, className)} type={type} disabled={disabled}>
    {children}
  </button>
);

export type ButtonProps = {
  pre?: ReactNode,
  post?: ReactNode,
  flat?: boolean,
  outline?: boolean,
  circle?: boolean,
} & BaseProps;

export const Button: React.FC<ButtonProps> = ({
  className = '',
  pre = null,
  post = null,
  flat = true,
  outline = true,
  circle = true,
  disabled = false,
  onClick,
  children,
}) => (
  <BaseButton
    className={classNames(
      className,
      {
        [css.flat]: flat,
        [css.outline]: outline,
        [css.circle]: circle,
      }
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {pre && <span className={css.pre}>{pre}</span>}
    {children}
    {post && <span className={css.post}>{post}</span>}
  </BaseButton>
);

