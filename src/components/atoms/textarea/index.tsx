import React, { ReactNode, MouseEventHandler } from 'react'
import css from './index.module.css'
import classNames from 'classnames'

type BaseProps = {
  className?: string
  children?: never
} & Omit<JSX.IntrinsicElements['textarea'], 'children'>

const BaseTextarea: React.FC<BaseProps> = ({
  className = '',
  ...rest
}) => (
  <textarea className={classNames(css.textarea, className)} {...rest} />
);

export type TextareaProps = {
  className?: string
  textareaClassName?: string
  value: string
  children?: ReactNode
} & Omit<BaseProps, 'value' | 'children'>;

export const Textarea: React.FC<TextareaProps> = ({
  className = '',
  textareaClassName= '',
  value = '',
  maxLength,
  minLength,
  disabled= false,
  children = null,
  ...rest
}) => (
  <label className={classNames(css.root, className, { [css.disabled]: disabled })}>
    {children}
    <div className={css.wrapper}>
      <BaseTextarea
        {...rest}
        className={textareaClassName}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
      />
      {(minLength || maxLength) && (
        <p className={classNames(css.limit, {
          [css.error]: (minLength ? minLength > value.length : false)
            || (maxLength ? maxLength > value.length : false),
          [css.disabled]: disabled
        })}>
          {minLength && `${minLength} > `}
          <span>{value.length}</span>
          {maxLength && ` > ${maxLength}`}
        </p>
      )}
    </div>
  </label>
)
