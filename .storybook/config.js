import React from 'react'
import { configure, load, addDecorator } from '@storybook/react';
import 'antd/dist/antd.css'

addDecorator((storyFn) => {
	return <div style={{
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh'
	}}>{storyFn()}</div>
})

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.story\.js$/), module);
