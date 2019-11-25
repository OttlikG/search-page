import React from 'react'
import RangeSelector from './range-selector'
import { withKnobs, number } from '@storybook/addon-knobs'

export default {
	title: 'RangeSelector',
	decorators: [withKnobs]
}

export const basic = () => <RangeSelector min={0} max={100} value={number('Value', 50)} />