import React from 'react'
import IconText from './icon-text'
import { withKnobs, text } from '@storybook/addon-knobs'

export default {
	title: 'IconText',
	decorators: [withKnobs]
}

export const iconText = () => <IconText icon="fa-bath" text={text('Text', 'Bathroom')} />