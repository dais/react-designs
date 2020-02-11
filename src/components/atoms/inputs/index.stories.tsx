import React from 'react'
import { boolean, select, text as txt } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { TextField, ToggleField, RadioGroup, FileField } from './index'

export default { title: 'atoms/inputs' }
export const text = () => (
  <TextField
    value={txt('value', '')}
    disabled={boolean('disabled', false)}
    error={txt('error', '')}
    onChange={action('onChange')}
  >
    名前
  </TextField>
);

export const email = () => (
  <TextField
    type="email"
    value={txt('value', '')}
    disabled={boolean('disabled', false)}
    error={txt('error', '')}
    onChange={action('onChange')}
  >
    メールアドレス
  </TextField>
);

export const tel = () => (
  <TextField
    type="tel"
    value={txt('value', '')}
    disabled={boolean('disabled', false)}
    error={txt('error', '')}
    onChange={action('onChange')}
  >
    電話番号
  </TextField>
);

export const password = () => (
  <TextField
    type="password"
    value={txt('value', '')}
    disabled={boolean('disabled', false)}
    error={txt('error', '')}
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
    error={txt('error', '')}
    onChange={action('onChange')}
  >
    有効/無効
  </ToggleField>
);

export const radioGroup = () => (
  <RadioGroup
    name="test"
    error={txt('error', '')}
    disabled={boolean('disabled', false)}
    direction={select('direction', ['vertical', 'horizontal'], 'vertical')}
    radios={[{ label: 'man', checked: boolean('man', false) }, { label: 'woman', checked: boolean('woman', true )}]}
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

