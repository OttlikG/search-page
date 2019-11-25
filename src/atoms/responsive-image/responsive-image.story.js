import React from 'react'
import ResponsiveImage from './responsive-image'

export default {
	title: 'ResponsiveImage'
}

export const basic = () => (
	<div style={{ maxWidth: '800px' }}>
		<ResponsiveImage
			url='https://static.plumcache.com/listings/20604/hero/c1bd4b54-dfe9-47f9-998a-49a7be281ee1.jpg'
		/>
	</div>
)
