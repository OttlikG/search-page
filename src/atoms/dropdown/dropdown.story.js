import React from 'react'
import Dropdown from './dropdown'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Dropdown'
}

const data = [
	{ id: 1, label: 'London' },
	{ id: 2, label: 'Paris' },
	{ id: 3, label: 'New York' }
]

export const basic = () => <Dropdown data={data} onChange={action('onChange')} />
export const defaultSelected = () => <Dropdown data={data} value={1} onChange={action('onChange')} />
export const withPlaceholder = () => <Dropdown data={data} placeholder="City" />
