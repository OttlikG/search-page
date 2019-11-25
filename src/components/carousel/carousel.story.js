import React from 'react'
import Carousel from './carousel'

export default {
	title: 'Carousel'
}

const urls = [
	'https://static.plumcache.com/listings/20603/hero/82e9c8cb-4ef8-4a65-9b30-2736ed412318.jpg',
	'https://static.plumcache.com/listings/20603/hero/f7904f52-5152-417b-9c5c-515ebc760afe.jpg',
	'https://static.plumcache.com/listings/20603/hero/38876608-c67e-46d4-9eb4-e15bf83e9bff.jpg'
]
export const basic = () => (
	<div style={{ width: '800px' }}>
		<Carousel urls={urls} />
	</div>
)
