import React, { useMemo, ReactNode } from 'react'
import classNames from 'classnames'
import css from './index.module.css'
import { CustomChangeEventHandler } from '../..'

type BaseProps = {
  className?: string
  children?: never
  onChange?: CustomChangeEventHandler
} & Omit<JSX.IntrinsicElements['textarea'], 'children' | 'onChange'>

const BaseTextarea: React.FC<BaseProps> = ({
  className = '',
  ...rest
}) => (
  <textarea
    {...rest}
    className={classNames(css.textarea, className)}
    onChange={(event) => ({
      value: event.target.value,
      event
    })}
  />
);

export type TextareaProps = {
  className?: string
  textareaClassName?: string
  value?: string
  error?: string
  fixLabelWidth?: number
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
  fixLabelWidth,
  children = null,
  ...rest
}) => {
  const isLimited = useMemo(() => limited(value.length, minLength, maxLength), [value.length, minLength, maxLength])
  return (
    <label className={classNames(css.root, className, { [css.disabled]: disabled, [css.error]: isLimited || error })}>
      <span className={css.label} style={{ width: fixLabelWidth != null ? `${fixLabelWidth}em` : undefined }}>
        { children }
      </span>
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
