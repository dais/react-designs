import React from 'react'
import { boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { TextField, ToggleField, RadioGroup, FileField } from './index'

export default { title: 'atoms/inputs' }
export const text = () => (
  <TextField
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  >
    名前
  </TextField>
);

export const email = () => (
  <TextField
    type="email"
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  >
    メールアドレス
  </TextField>
);

export const tel = () => (
  <TextField
    type="tel"
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  >
    電話番号
  </TextField>
);

export const password = () => (
  <TextField
    type="password"
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  >
    パスワード
  </TextField>
);

export const checkbox = () => (
  <ToggleField
    type='checkbox'
    checked={boolean('checked', false)}
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  >
    有効/無効
  </ToggleField>
);

export const radioGroup = () => (
  <RadioGroup
    name="test"
    direction={select('direction', ['vertical', 'horizontal'], 'vertical')}
    radios={[{ label: '国語', checked: false }, { label: '数学', checked: true }]}
  >
    選択
  </RadioGroup>
);

export const file = () => (
  <FileField
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  >
    保存
  </FileField>
);

