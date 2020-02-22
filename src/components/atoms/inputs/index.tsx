import React, {
  useMemo,
  useState,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  ChangeEventHandler
} from 'react';
import classNames from 'classnames';
import css from './index.module.css';
import { CustomChangeEventHandler } from '../..'

type BaseProps = {
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
} & Omit<JSX.IntrinsicElements['input'], 'onChange'>

const BaseInput: React.FC<BaseProps> = ({
  className = '',
  onChange,
  ...rest
}) => (
  <input
    {...rest}
    className={classNames(css.input, className)}
    onChange={(event) => ({
      value: event.target.value,
      checked: event.target.checked,
      event
    })}
  />
);

// Text or Email or Tel or Password
export type TextFieldProps = {
  type?: 'text' | 'email' | 'tel'  | 'password'
  className?: string
  inputClassName?: string
  error?: string
  fixLabelWidth?: number
} & Omit<BaseProps, 'type'>

export const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  className = '',
  inputClassName = '',
  disabled = false,
  error = '',
  fixLabelWidth,
  children = null,
  ...rest
}) => (
  <label className={classNames(css.root, className, { [css.disabled]: disabled, [css.error]: error })}>
    <span className={css.label} style={{ width: fixLabelWidth != null ? `${fixLabelWidth}em` : undefined }}>
      { children }
    </span>
    <BaseInput
      {...rest}
      disabled={disabled}
      className={inputClassName}
      type={type}
    />
  </label>
);

// Checkbox or Radio
export type ToggleFieldProps = {
  type?: 'checkbox' | 'radio'
  className?: string
  inputClassName?: string
  error?: string
  fixLabelWidth?: number
} & Omit<BaseProps, 'type'>

export const ToggleField: React.FC<ToggleFieldProps> = ({
  type= 'checkbox',
  className = '',
  inputClassName = '',
  children = null,
  checked,
  disabled= false,
  error = '',
  fixLabelWidth,
  ...rest
}) => (
  <label className={classNames(css.root, className, { [css.disabled]: disabled, [css.error]: error })}>
    <span className={css.label}  style={{ width: fixLabelWidth != null ? `${fixLabelWidth}em` : undefined }}>
      { children }
    </span>
    <div
      className={classNames(css.wrapper, {
        [css.radio]: type === 'radio',
        [css.checkbox]: type === 'checkbox',
        [css.checked]: checked,
        [css.error]: error,
        [css.disabled]: disabled
      })}
    >
      <BaseInput
        {...rest}
        className={inputClassName}
        type={type}
        checked={checked}
        disabled={disabled}
      />
    </div>
  </label>
);

// ToggleGroup, ToggleGroup
export type ToggleItemProps = Omit<ToggleFieldProps, 'name' | 'type' | 'disabled'> & { label: ReactNode }
export type ToggleGroupProps = {
  name: string
  type?: 'checkbox' | 'radio'
  direction?: 'vertical' | 'horizontal'
  className?: string
  disabled?: boolean
  error?: string
  outline?: boolean
  fixLabelWidth?: number
  items: ToggleItemProps[]
  renderer?: (props: ToggleItemProps) => ReactNode
  onChange?: CustomChangeEventHandler
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  name,
  type = 'radio',
  direction = 'vertical',
  className = '',
  disabled = false,
  error = '',
  outline = true,
  fixLabelWidth,
  items,
  renderer= (props) => props.label,
  onChange,
  children,
}) => (
  <div
    className={classNames(
      css.groups,
      className,
      {
        [css.horizontal]: direction === 'horizontal',
        [css.error]: error,
        [css.disabled]: disabled,
      }
    )}
  >
    {outline && children && (
      <span className={css.label} style={{ width: fixLabelWidth != null ? `${fixLabelWidth}em` : undefined }}>
        { children }
      </span>
    )}
    <div className={classNames({ [css.outline]: outline, [css.error]: error })}>
      {items.map((props, index) => (
        <ToggleField
          {...props}
          key={index}
          name={name}
          type={type}
          error={error}
          disabled={disabled}
          onChange={useCallback(event => {
            const item = { ...items[index], ...event }
            const newItems = [...items]
            newItems.splice(index, 1, item)
            if (onChange) {
              onChange({ ...event, items: newItems })
            }
          }, [items])}
        >
          {useMemo(() => renderer(props), [items[index], renderer])}
        </ToggleField>
      ))}
    </div>
  </div>
);

// File
export type FileFieldProps = {
  className?: string
  inputClassName?: string
  error?: string // TODO: form対応のためerrorをつけたが、errorの想定がない。
  fixLabelWidth?: number
  onChange?: CustomChangeEventHandler
} & Omit<BaseProps, 'type'>

const selectFile = (setFiles: Dispatch<SetStateAction<File[]>>, onChange?: CustomChangeEventHandler) => (event: ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files
  if (files === null) return []

  const list = []
  for (let i = 0; i < files.length; i++) {
    const item = files.item(i)
    if (item !== null) {
      list.push(item);
    }
  }
  setFiles(list);
  if (onChange) { onChange({ event, value: event.target.value, files }) }
}

export const FileField: React.FC<FileFieldProps> = ({
  className = '',
  inputClassName = '',
  disabled = false,
  children = null,
  error = '',
  fixLabelWidth,
  onChange,
  value, // INFO: valueは利用しないが、FileListが入ってしまうため、omitしないといけない。
  ...rest
}) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <label className={classNames(css.root, className, { [css.disabled]: disabled, [css.error]: error })}>
      <span className={css.label} style={{ width: fixLabelWidth != null ? `${fixLabelWidth}em` : undefined }}>
        { children }
      </span>
      <BaseInput
        {...rest}
        disabled={disabled}
        className={classNames(css.file, inputClassName)}
        onChange={useCallback(selectFile(setFiles, onChange), [onChange])}
        type="file"
      />
      <span>
        {files.map((file, index) => <span key={file.name}>{file.name}{ index !== 0 ? ',' : null}</span>)}
      </span>
    </label>
  );
}

