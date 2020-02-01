import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Button } from './index'

export default { title: 'atoms/buttons' }
export const button = () => (
  <Button
    flat={boolean('flat', false)}
    outline={boolean('outline', false)}
    circle={boolean('circle', false)}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  >
    保存
  </Button>
);
