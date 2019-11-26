
import React from 'react'
import { connect } from 'react-redux'
import Dropdown from '../../atoms/dropdown/dropdown'
import Button from '../../atoms/button/button'
import PropertyCard from '../../components/property-card/property-card'
import RangeSelector from '../../atoms/rage-selector/range-selector'

import {
	searchAccommodation as searchAccommodationAction,
	getAccommodationImages as getAccommodationImagesAction
} from './action'
import { selectListings } from './selectors'

import cities from './fixtures/cities'
import guests from './fixtures/guests'

import './style.css'

function Search({
	listings,
	searchAccommodation,
	getAccommodationImages
}) {
	const [city, onCityChange] = React.useState(1)
	const [guest, onGuestChange] = React.useState()
	const [minPrice, onMinPriceChange] = React.useState()

	React.useEffect(() => {
		console.log('search effect')
		searchAccommodation({city, guest, minPrice})
	}, [searchAccommodation])

	const onSearchHandler = React.useCallback(
		() => searchAccommodation({ city, guest, minPrice }),
		[searchAccommodation, city, guest, minPrice]
	)

	console.log('-- search')

	return (
		<div className="search">
			<div className="search-box">
				<div className="search-input">
					<Dropdown data={cities} placeholder="City" onChange={onCityChange} value={city} />
					<Dropdown data={guests} onChange={onGuestChange} value={guest} />
					<RangeSelector labelPrefix="£" onChange={onMinPriceChange} min={200} max={800} value={301} />
					<Button onClick={onSearchHandler}>
						Submit
					</Button>
				</div>
			</div>
			<div className="listing">
				{listings.map(listing => <PropertyCard key={listing.heading} {...listing} getAccommodationImages={getAccommodationImages} />)}
			</div>
		</div>
	)
}

export default connect((store) => ({
	listings: selectListings(store)
}), {
		searchAccommodation: searchAccommodationAction,
		getAccommodationImages: getAccommodationImagesAction
})(Search)