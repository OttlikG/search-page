import React from 'react'
import getQueryString from '../../libs/get-query-string'
import './style.css'

function generateUrl(url, options) {
	return `${url}?${getQueryString(options)}`
}

function generateSrcset(url, sizeOption) {
	return `${generateUrl(url, { w: sizeOption.imageSize })} ${sizeOption.imageSize}w`
}

function generateSource(url, breakPoint, sizeOption = { imageSize: breakPoint }) {
	return <source key={breakPoint} srcSet={generateSrcset(url, sizeOption)} media={`(max-width: ${breakPoint}px)`} />
}

function generateSources(url, breakPoints, viewportGrid) {
	return breakPoints.map(breakPoint => generateSource(url, breakPoint, viewportGrid[breakPoint]))
}

const BREAKPOINTS = [375, 768, 960, 1200]
export default function ResponsiveImage({ url, alt, viewportPreference = {} }) {
	return (
		<div className='responsive-image'>
			<picture>
				{generateSources(url, BREAKPOINTS, viewportPreference)}
				<img src={url} alt={alt} />
			</picture>
		</div>
	)
}