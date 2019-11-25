import React from 'react'
import { shallow } from 'enzyme'
import Button from './button'

describe('Button', () => {
	it('should have onClick handler', () => {
		const onClickSpy = jest.fn()
		const component = shallow(<Button onClick={onClickSpy} />)

		expect(component.find('Button').props().onClick).toBeDefined()
	})
})