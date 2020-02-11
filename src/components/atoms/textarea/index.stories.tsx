import React from 'react'
import { boolean, text, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Textarea } from './index'

export default { title: 'atoms/textarea' }
export const textarea = () => (
  <Textarea
    value={text('value', 'hoge')}
    disabled={boolean('disabled', false)}
    error={text('error', '')}
    minLength={number('minLength', 10)}
    maxLength={number('maxLength', 100)}
    onChange={action('onChange')}
  >
    感想
  </Textarea>
);
