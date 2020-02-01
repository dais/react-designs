import { configure } from '@storybook/react';
import { addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

addDecorator(withA11y)
addParameters({
  backgrounds: [
    { name: 'white', value: '#fff', default: true },
    { name: 'gray', value: '#aaa' },
    { name: 'dark', value: '#444' },
  ],
});

configure(require.context('../src', true, /\.stories\.ts(x?)$/), module);
