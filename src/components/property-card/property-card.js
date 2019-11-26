import React from 'react'
import IconText from '../../atoms/icon-text/icon-text'
import Carousel from '../carousel/carousel'
import './style.css'

function PropertyCard({
	id,
	heading,
	city,
	images,
	price,
	facilities,
	getAccommodationImages
}) {
	const propertyCardRef = React.useRef()
	function generateFacilityText(facility, facilityAmount) {
		if (facility === 'bedroomCount') {
			return `${facilityAmount} Bedroom`
		} else if (facility === 'bathroomCount') {
			return `${facilityAmount} Bathroom`
		} else if (facility === 'guests') {
			return `Sleeps ${facilityAmount}`
		}
	}

	React.useEffect(() => {
		const options = {
			threshold: 0.1
		}
		function inView(entries, observer) {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					getAccommodationImages(id)
				}
			})
			console.log("-- in view", entries)
		}
		const observer = new IntersectionObserver(inView, options)
		// const loadingBackgrounds = document.querySelectorAll('.carousel__loading-background');

		// [...loadingBackgrounds].forEach(loadingBackground => {
		// 	observer.observe(loadingBackground)
		// })

		observer.observe(propertyCardRef.current)
		const persistPropertyCardRef = propertyCardRef.current

		if (images.length) {
			observer.unobserve(persistPropertyCardRef)
		}

		return () => {
			observer.unobserve(persistPropertyCardRef)
		}
	}, [images])

	console.log('-- property card')

	return (
		<div className="property-card" ref={propertyCardRef}>
			<div className="property-card__carousel">
				<Carousel urls={images} />
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

export default PropertyCard
