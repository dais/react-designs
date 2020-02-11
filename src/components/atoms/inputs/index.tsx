import React, {
  useMemo,
  useState,
  useCallback,
  ReactNode,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from 'react';
import css from './index.module.css';
import classNames from 'classnames';

type BaseProps = {
  className?: string
} & JSX.IntrinsicElements['input']

const BaseInput: React.FC<BaseProps> = ({
  className = '',
  ...rest
}) => (
  <input {...rest} className={classNames(css.input, className)} />
);

// Text or Email or Tel or Password
export type TextFieldProps = {
  type?: 'text' | 'email' | 'tel'  | 'password'
  className?: string
  inputClassName?: string
  error?: string
} & Omit<BaseProps, 'type'>

export const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  className = '',
  inputClassName = '',
  disabled = false,
  error = '',
  children = null,
  ...rest
}) => (
  <label className={classNames(css.root, className, { [css.disabled]: disabled, [css.error]: error })}>
    { children }
    <BaseInput
      {...rest}
      disabled={disabled}
      className={inputClassName}
      type={type}
    />
  </label>
);

// Checkbox or Radio
export type ToggleProps = {
  type: 'checkbox' | 'radio'
  className?: string
  inputClassName?: string
  error?: string
} & Omit<BaseProps, 'type'>

export const ToggleField: React.FC<ToggleProps> = ({
  type,
  className = '',
  inputClassName = '',
  children = null,
  checked,
  disabled= false,
  error = '',
  onChange = () => {},
  ...rest
}) => (
  <label className={classNames(css.root, className, { [css.disabled]: disabled, [css.error]: error })}>
    { children }
    <div className={classNames(css.wrapper, {
      [css.radio]: type === 'radio',
      [css.checkbox]: type === 'checkbox',
      [css.checked]: checked,
      [css.disabled]: disabled
    })}>
      <BaseInput
        {...rest}
        className={inputClassName}
        type={type}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  </label>
);

// RadioGroup
type RadioProps = Omit<ToggleProps, 'name' | 'type' | 'disabled'> & { label: ReactNode }
export type RadioGroupProps = {
  name: string,
  direction?: 'vertical' | 'horizontal'
  className?: string
  disabled?: boolean
  error?: string
  radios: RadioProps[]
  renderer?: (props: RadioProps) => ReactNode
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  direction = 'vertical',
  className = '',
  disabled = false,
  error = '',
  radios,
  renderer= (props) => props.label,
}) => (
  <div className={classNames(
    css.groups,
    className,
    {
      [css.horizontal]: direction === 'horizontal',
      [css.error]: error,
      [css.disabled]: disabled,
    }
  )}>
    {radios.map((props, index) => (
        <ToggleField key={index} name={name} type='radio' disabled={disabled} {...props}>
          {useMemo(() => renderer(props), [radios[index], renderer])}
        </ToggleField>
      )
    )}
  </div>
);

// File
export type FileFieldProps = {
  className?: string
  inputClassName?: string
} & Omit<BaseProps, 'type'>

const selectFile = (setFiles: Dispatch<SetStateAction<File[]>>) => (event: ChangeEvent<HTMLInputElement>) => {
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
}

export const FileField: React.FC<FileFieldProps> = ({
  className = '',
  inputClassName = '',
  disabled = false,
  children = null,
  ...rest
}) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <label className={classNames(css.root, className, {[css.disabled]: disabled})}>
      {children}
      <BaseInput
        {...rest}
        disabled={disabled}
        className={classNames(css.file, inputClassName)}
        onChange={useCallback(selectFile(setFiles), [])}
        type="file"
      />
      <span>
        {files.map((file, index) => <span key={file.name}>{file.name}{ index !== 0 ? ',' : null}</span>)}
      </span>
    </label>
  );
}

