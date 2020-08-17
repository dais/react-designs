import React, { FC, ReactNode } from 'react'
import styles from './select.module.scss'
import clsx from 'clsx'

export type Option = {
  key: string
  value: string
  disabled?: boolean
}

type Props = {
  className?: string
  optionRenderer?: (option: Option) => ReactNode
  options: Option[]
  value: string
  name: string
  onChange?: (value: string) => void
}

const Select: FC<Props> = ({
  className,
  optionRenderer = (option: Option) => option.value,
  options,
  value,
  name,
  onChange = () => {}
}) => {
  return (
    <div role="menu" className={clsx(className, styles.root)}>
      <input
        className={styles.input}
        name={name}
        value={value}
        readOnly
      />
      <ul className={styles.options} style={{}}>
        {options.map(option => (
          <li
            key={option.key}
            className={clsx(
              styles.option,
              {
                [styles.disabled]: option.disabled ?? false,
                [styles.active]: option.value === value
              }
            )}
            onClick={() => { if (option.disabled === true) return; onChange(option.value) }}
          >
            {optionRenderer(option)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select 

