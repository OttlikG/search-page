import React from 'react'
import { shallow } from 'enzyme'
import IconText from './icon-text'

describe('IconText', () => {
	it('should render appropriate text and icon from props', () => {
		const text = 'Apartment'
		const icon = 'fa-apartment'
		const component = shallow(<IconText text={text} icon={icon} />)

		expect(component.find('.icon-text .fa-apartment').exists()).toBe(true)
		expect(component.find('.icon-text__text').at(0).text()).toBe('Apartment')
	})
})