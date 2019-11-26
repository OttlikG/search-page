import getParams from '../../libs/get-query-string'
import { filterUndefined } from '../../libs/utils'
import {SEARCH_SUCCESS, GET_ACCOMMODATION_IMAGE_SUCCESS} from './reducer'

const BASE_URL = 'https://plumguide-staging.global.ssl.fastly.net'

function getAccommodationImagesAction(data) {
	return {
		type: GET_ACCOMMODATION_IMAGE_SUCCESS,
		payload: data
	}
}

export const getAccommodationImages = (propertyId) => async dispatch => {
	const response = await fetch(`https://plumguide-staging.global.ssl.fastly.net/Listing/Photos?id=${propertyId}`)
	const data = await response.json();

	return dispatch(getAccommodationImagesAction(data))
}

function searchAccommodationSuccess(listings) {
	return {
		type: SEARCH_SUCCESS,
		payload: listings
	}
}

export const searchAccommodation = query => async dispatch => {
	try {
		const params = getParams(filterUndefined({
			CityId: query.city,
			Guests: query.guest,
			PriceBottom: query.minPrice,
			PriceTop: query.maxPrice
		}))

		const response = await fetch(`${BASE_URL}/search/api/?${params}`, {
			headers: {
				Accept: 'application/json'
			}
		})
		const data = await response.json()
		dispatch(searchAccommodationSuccess(data.Listings))
		await Promise.all(data.Listings.slice(0, 6).map(async listing => {
			return dispatch(getAccommodationImages(listing.ListingId))
		}))
	} catch (error) {
		console.error(error)
	}
}
