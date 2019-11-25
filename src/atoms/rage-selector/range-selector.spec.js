import React from 'react'
import { shallow, mount } from 'enzyme'
import RangeSelector from './range-selector'

describe('RangeSelector', () => {
	describe('valueValidator', () => {
		it('should set initialValue to the middle if out of range', () => {
			const props = {
				min: 0,
				max: 100,
				initialValue: 102
			}
			const component = shallow(<RangeSelector {...props} />)
			const propsOnInput = component.find('input').props()

			expect(propsOnInput.defaultValue).toBe(50)
		})

		it('should set initialValue to the center if not defined', () => {
			const props = {
				min: 0,
				max: 100
			}
			const component = shallow(<RangeSelector {...props} />)
			const initialValue = component.find('input').props().defaultValue

			expect(initialValue).toBe(50)
		})

		it('should swap max with min if max smaller that min', () => {
			const props = {
				min: 100,
				max: 1
			}
			const component = shallow(<RangeSelector {...props} />)
			const propsOnInput = component.find('input').props()

			expect(propsOnInput.min).toBe(1)
			expect(propsOnInput.max).toBe(100)
		})

		it('should set initial values for min max', () => {
			const props = {
				initialValue: 200
			}
			const component = shallow(<RangeSelector {...props} />)
			const propsOnInput = component.find('input').props()

			expect(propsOnInput.min).toBe(0)
			expect(propsOnInput.max).toBe(100)
			expect(propsOnInput.defaultValue).toBe(50)
		})
	})

	describe('applyFill', () => {
		it('should render style on initial load', () => {
			const props = {
				min: 0,
				max: 100,
				initialValue: 40
			}
			const component = mount(<RangeSelector {...props} />)
			const style = component.find('input').props().style
			expect(style.background).toContain('40%')
		})

		it('should call applyFilter when input is changed', () => {
			const props = {
				min: 0,
				max: 100,
				initialValue: 50
			}
			const component = mount(<RangeSelector {...props} />)
			component.find('input').simulate('change', { target: { value: 40, min: 0, max: 100 } })

			expect(component.find('input').props().style.background).toContain('40%')
		})

		it('should call the onChange with the range-selector position', () => {
			const onChangeSpy = jest.fn()
			const props = {
				min: 0,
				max: 100,
				onChange: onChangeSpy
			}

			const component = mount(<RangeSelector {...props} />)
			expect(onChangeSpy).toHaveBeenCalledWith(50)
		})
	})
})