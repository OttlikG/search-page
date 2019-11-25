
const initialValues = {
	listings: [],
	images: {}
}

export const SEARCH_SUCCESS = 'search/SEARCH_SUCCESS'
export const GET_ACCOMMODATION_IMAGE_SUCCESS = 'search/GET_ACCOMMODATION_IMAGE_SUCCESS'

export default function search(state = initialValues, action) {
	switch (action.type) {
		case SEARCH_SUCCESS: {
			return {
				...state,
				listings: action.payload || []
			}
		}
		case GET_ACCOMMODATION_IMAGE_SUCCESS: {
			return {
				...state,
				images: {
					...state.images,
					[action.payload.id]: action.payload.imageUrls
				}
			}
		}
		default: {
			return state
		}
	}
}