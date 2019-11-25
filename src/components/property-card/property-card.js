import React from 'react'
import IconText from '../../atoms/icon-text/icon-text'
import Carousel from '../carousel/carousel'
import './style.css'

export default function PropertyCard({
	heading,
	city,
	images,
	price,
	facilities
}) {
	function generateFacilityText(facility, facilityAmount) {
		if (facility === 'bedroomCount') {
			return `${facilityAmount} Bedroom`
		} else if (facility === 'bathroomCount') {
			return `${facilityAmount} Bathroom`
		} else if (facility === 'guests') {
			return `Sleeps ${facilityAmount}`
		}
	}

	return (
		<div className="property-card">
			<div className="property-card__carousel">
				<Carousel urls={images} imageWindow={5} />
			</div>
			<div className="property-card__description">
				<div className="property-card__title">
					<div className="property-card__heading">{heading}</div>
					<div className="property-card__subheading">{city}</div>
				</div>
				<div className="property-card__price">£{price}</div>
			</div>
			<div className="property-card__facility">
				{Object.keys(facilities).map(facility => <li key={facility}><IconText icon="fa-bath" text={generateFacilityText(facility, facilities[facility])} /></li>)}
			</div>
		</div>
	)
}	