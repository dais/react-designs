import React, { useMemo, ReactNode } from 'react'
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
  error?: string
  children?: ReactNode
} & Omit<BaseProps, 'value' | 'children'>;

const limited = (length: number, min?: number, max?: number) =>
  (min ? min > length : false) || (max ? max < length : false)

export const Textarea: React.FC<TextareaProps> = ({
  className = '',
  textareaClassName= '',
  value = '',
  maxLength,
  minLength,
  disabled= false,
  error = '',
  children = null,
  ...rest
}) => {
  const isLimited = useMemo(() => limited(value.length, minLength, maxLength), [value.length, minLength, maxLength])
  return (
    <label className={classNames(css.root, className, {[css.disabled]: disabled})}>
      {children}
      <div className={css.wrapper}>
        <BaseTextarea
          {...rest}
          className={classNames(textareaClassName, { [css.error]: isLimited || error })}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
        />
        {(minLength || maxLength) && (
          <p className={classNames(css.limit, {
            [css.error]: isLimited,
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
}
