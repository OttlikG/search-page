import React from 'react'
import { mount, shallow } from 'enzyme'
import Dropdown from './dropdown'

describe('Dropdown', () => {
	it('should display default option', () => {
		const onChangeSpy = jest.fn()
		const data = [
			{ id: 1, label: 'London' },
			{ id: 2, label: 'Paris' }
		]
		const component = shallow(<Dropdown data={data} onChange={onChangeSpy} value={1} />)

		expect(component.find('.dropdown__active-option').at(0).text()).toBe('London')
	})

	it('should display placeholder if no default value', () => {
		const onChangeSpy = jest.fn()
		const data = [
			{ id: 1, label: 'London' },
			{ id: 2, label: 'Paris' }
		]
		const component = shallow(<Dropdown data={data} onChange={onChangeSpy} placeholder="Select a city" />)

		expect(component.find('.dropdown__active-option').at(0).text()).toBe('Select a city')
	})

	it('should display active class on select item', () => {
		const onChangeSpy = jest.fn()
		const data = [
			{ id: 1, label: 'London' },
			{ id: 2, label: 'Paris' }
		]
		const component = mount(<Dropdown data={data} onChange={onChangeSpy} placeholder="Select a city" />)

		component.find('.dropdown__active-option').at(0).simulate('click')
		
		expect(component.exists('.dropdown__menu--active')).toBe(true)
	})

	it('should return with the selected data and hide the dropdown when the item is clicked', () => {
		const onChangeSpy = jest.fn()
		const data = [
			{ id: 1, label: 'London' },
			{ id: 2, label: 'Paris' }
		]
		const component = mount(<Dropdown data={data} onChange={onChangeSpy} placeholder="Select a city" />)

		component.find('.dropdown__active-option').at(0).simulate('click')
		component.find('.dropdown__menu li').at(0).simulate('click')
		
		expect(onChangeSpy).toHaveBeenCalledWith(1)
	})
})