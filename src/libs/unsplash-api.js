import Unsplash from 'unsplash-js'

const unsplash = new Unsplash({
	accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY
})

export async function listPhotos(destination) {
	try {
		const response = await unsplash.search.photos(destination, 1, 15, { orientation: 'portrait' })
		return await response.json()
	} catch (error) {
		console.error(error)
		return []
	}
}

export default {}
