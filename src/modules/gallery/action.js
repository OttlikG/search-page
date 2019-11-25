import { listPhotos } from '../../libs/unsplash-api'

export const SET_IMAGES = 'SET_IMAGES'

export const setImages = images => ({
	type: SET_IMAGES,
	payload: images,
})

export function fetchImages() {
	return async dispatch => {
		const response = await listPhotos('food')
		const { results } = response
		const images = results.map(image => image.urls)

		dispatch(setImages(images))
	}
}
