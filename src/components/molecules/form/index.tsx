import React, { useState, useMemo, useCallback, ReactNode, ChangeEvent, MouseEvent } from 'react'
import classNames from 'classnames'
import css from './index.module.css'
import {
  TextFieldProps,
  ToggleFieldProps,
  FileFieldProps,
  TextareaProps,
  ToggleGroupProps,
  TextField,
  ToggleField,
  FileField,
  Button,
  Textarea,
  ToggleGroup,
  CustomChangeEvent,
} from '../..'

type BaseProps = {
} & JSX.IntrinsicElements['form']

const BaseForm: React.FC<BaseProps> = ({
  className = '',
  children,
  ...rest
}) => (
  <form className={classNames(css.root, className)} {...rest}>
    {children}
  </form>
);

const TypeMap = {
  'text': TextField,
  'email': TextField,
  'tel': TextField,
  'password': TextField,
  'checkbox': ToggleField,
  'file': FileField,
  'textarea': Textarea,
  'toggleGroup': ToggleGroup
}

type FormItemBase = {
  id: string
  name: string
  valueKey?: keyof CustomChangeEvent
  rule?: string // TODO
  children?: ReactNode
} & CustomChangeEvent

type TextItem = { type: 'text', props: TextFieldProps }
type EmailItem = { type: 'email', props: TextFieldProps }
type TelItem = { type: 'tel', props: TextFieldProps }
type PasswordItem = { type: 'password', props: TextFieldProps }
type CheckboxItem = { type: 'checkbox', props: ToggleFieldProps }
type TextareaItem = { type: 'textarea', props: TextareaProps }
type FileItem = { type: 'file', props: FileFieldProps } // TODO
type ToggleGroupItem = { type: 'toggleGroup', props: Omit<ToggleGroupProps, 'name' | 'items'> }
type FormItem = FormItemBase & (
  TextItem |
  EmailItem |
  TelItem |
  PasswordItem |
  CheckboxItem |
  FileItem |
  TextareaItem |
  ToggleGroupItem
)

export type Forms = FormItem[]

export type FormProps = {
  forms: Forms
  title?: ReactNode
  outline?: boolean
  submitLabel?: string
  resetLabel?: string
  onSubmit: (forms: Forms, event: MouseEvent<HTMLButtonElement>) => void
  onReset?: (event: MouseEvent<HTMLButtonElement>) => void
} & BaseProps;

export const Form: React.FC<FormProps> = ({
  className = '',
  forms,
  title,
  outline = true,
  submitLabel = '送信',
  resetLabel= 'リセット',
  onSubmit,
  onReset,
  ...rest
}) => {
  const [formValues, setForm] = useState<Forms>(forms)
  const onChange = useCallback((name) => (event: CustomChangeEvent) => (
    setForm(forms => {
      const index = forms.findIndex(form => form.name === name)
      if (index !== -1) {
        forms.splice(
          index, 1,
          {
            ...forms[index],
            [forms[index].valueKey || 'value']: event[forms[index].valueKey || 'value'],
            checked: event.checked,
          }
        )
      }
      return forms
    })
  ), [name])
  return (
    <BaseForm className={classNames(css.root, className, { [css.outline]: outline })} {...rest}>
      {outline && title && <span className={css.title}>{title}</span>}
      <div className={css.wrapper}>
        {formValues.map(
          ({
             id,
             name,
             type,
             valueKey= 'value',
             children,
             props,
             ...rest
          }) => {
            const Component = TypeMap[type]
            return React.createElement(
              // INFO: strictFunctionTypesに引っかかっている。
              // @ts-ignore
              Component,
              {
                ...props,
                key: id,
                name,
                [valueKey]: rest[valueKey],
                error: '', // TODO: validation
                onChange: onChange(name)
              },
              children
            )
          }
        )}
      </div>
      <div className={css.action}>
        <Button type="submit" onClick={(event) => onSubmit(formValues, event)}>
          {submitLabel}
        </Button>
        {onReset && <Button type="reset" onClick={onReset}>{resetLabel}</Button>}
      </div>
    </BaseForm>
  );
}

