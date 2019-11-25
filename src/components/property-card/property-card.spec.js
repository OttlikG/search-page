import React from 'react'
import { mount } from 'enzyme'
import PropertyCard from './property-card'

describe('PropertyCard', () => {
	let props

	beforeEach(() => {
		props = {
			heading: 'Marylebon garden maisonette',
			city: 'London',
			price: 200,
			images: ['https://www.placeholdere.com/1', 'https://www.placeholdere.com/2', 'https://www.placeholdere.com/3'],
			facilities: { bathroomCount: 1 }
		}
	})

	it('should navigate to the previous image', () => {
		const component = mount(<PropertyCard {...props} />)
		component.find('.fa-chevron-left').first().simulate('click')
		const url = component.find('ResponsiveImage').first().props().url

		expect(url).toBe('https://www.placeholdere.com/3')
	})

	it('should navigate to the next image', () => {
		const component = mount(<PropertyCard {...props} />)
		component.find('.fa-chevron-right').first().simulate('click')
		const url = component.find('ResponsiveImage').first().props().url

		expect(url).toBe('https://www.placeholdere.com/2')
	})

	it('should match the heading', () => {
		const component = mount(<PropertyCard {...props} />)
		const heading = component.find('.property-card__heading').text()
		const subheading = component.find('.property-card__subheading').text()
		const price = component.find('.property-card__price').text()
		const facilities = component.find('.property-card__facility li')

		expect(heading).toBe(props.heading)
		expect(subheading).toBe(props.city)
		expect(price).toBe('£200')
		expect(facilities.length).toBe(1)
	})

	describe('generateFacilityText', () => {
		it('should return with bedroomCount as prefix', () => {
			const customProps = {
				...props,
				facilities: { bedroomCount: 1 }
			}
			const component = mount(<PropertyCard {...customProps} />)
			const text = component.find('.property-card__facility li').first().text()

			expect(text).toBe('1 Bedroom')
		})

		it('should return with bathroomCount as prefix', () => {
			const customProps = {
				...props,
				facilities: {
					bathroomCount: 2,
					bedroomCount: 1
				}
			}
			const component = mount(<PropertyCard {...customProps} />)
			const text = component.find('.property-card__facility li').first().text()
			expect(text).toBe('2 Bathroom')
		})

		it('should return with guests count as suffix', () => {
			const customProps = {
				...props,
				facilities: { guests: 1 }
			}
			const component = mount(<PropertyCard {...customProps} />)
			const text = component.find('.property-card__facility li').first().text()

			expect(text).toBe('Sleeps 1')
		})
	})
})