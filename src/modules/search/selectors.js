import { createSelector } from 'reselect'

function getListing(store) {
	return store.search.listings
}

function getImages(store) {
	return store.search.images
}

export const selectListings = createSelector(getListing, getImages, (listings, images) => {
	return listings.map(listing => ({
		id: listing.ListingId,
		url: listing.Url,
		heading: listing.Name,
		city: listing.CityName,
		price: listing.DisplayPriceWithFees,
		images: images[listing.ListingId] || [],
		facilities: {
			bedroomCount: listing.BedroomCount,
			bathroomCount: listing.BathroomCount,
			guests: listing.Guests
		}
	}))
})
