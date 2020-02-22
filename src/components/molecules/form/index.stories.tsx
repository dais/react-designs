import React from 'react'
import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Form, Forms } from './index'

const forms: Forms = [
  { id: '1', type: 'text', name: 'name', value: 'aaaaaa', rule: 'required|size:5', props: { fixLabelWidth: 10 }, children: 'name' },
  { id: '2', type: 'checkbox', name: 'language', value: 'english', checked: true, rule: 'required', props: { fixLabelWidth: 10 }, children: 'english' },
  { id: '3', type: 'textarea', name: 'profile', value: '', rule: 'required', props: { fixLabelWidth: 10 }, children: 'profile' },
  { id: '4', type: 'toggleGroup', name: 'skills', value: '', valueKey: 'items', items: [{ label: 'oracle', checked: false }, { label: 'golang', checked: true }], rule: 'required', props: { fixLabelWidth: 10 }, children: 'skills' },
]


export default { title: 'molecules/form' }
export const form = () => (
  <Form
    forms={forms}
    title={text('title', 'title')}
    submitLabel={text('submitLabel', 'submit')}
    resetLabel={text('resetLabel', 'reset')}
    onSubmit={action('onSubmit')}
    onReset={action('onReset')}
  />
);
