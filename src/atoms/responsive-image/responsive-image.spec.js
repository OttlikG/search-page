import React from 'react'
import { shallow } from 'enzyme'
import ResponsiveImage from './responsive-image'

describe('ResponsiveImage', () => {
	it('should set srcset', () => {
		const component = shallow(<ResponsiveImage url='https://image.com' />)
		const source = component.find('picture source')

		expect(source.first().props().srcSet).toBe('https://image.com?w=375 375w')
	})

	it('should set srcSet based on viewportPreference', () => {
		const viewportPreference = {
			1200: { imageSize: 600 }
		}
		const component = shallow(<ResponsiveImage url='https://image.com' viewportPreference={viewportPreference} />)
		const props = component.find('picture source').last().props()
		expect(props.srcSet).toBe('https://image.com?w=600 600w')
	})
})