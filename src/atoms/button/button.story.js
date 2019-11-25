import React from 'react'
import { action } from '@storybook/addon-actions'
import Button from './button'

export default { title: 'Button' }
export const withText = () => <Button onClick={action('button-click')}>Submit</Button>