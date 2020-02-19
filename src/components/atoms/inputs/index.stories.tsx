import React from 'react'
import { boolean, select, text as txt } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { TextField, ToggleField, ToggleGroup, FileField } from './index'

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
  <ToggleGroup
    name="test"
    error={txt('error', '')}
    disabled={boolean('disabled', false)}
    outline={boolean('outline', false)}
    direction={select('direction', ['vertical', 'horizontal'], 'vertical')}
    items={[{ label: 'man', checked: boolean('man', false) }, { label: 'woman', checked: boolean('woman', true )}]}
  >
    性別
  </ToggleGroup>
);

export const checkboxGroup = () => (
  <ToggleGroup
    name="test"
    type="checkbox"
    error={txt('error', '')}
    disabled={boolean('disabled', false)}
    outline={boolean('outline', false)}
    direction={select('direction', ['vertical', 'horizontal'], 'vertical')}
    items={[{ label: 'music', checked: boolean('music', false) }, { label: 'sports', checked: boolean('sports', true )}]}
  >
    趣味
  </ToggleGroup>
);

export const file = () => (
  <FileField
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  >
    保存
  </FileField>
);

