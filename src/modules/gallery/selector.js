import { createSelector } from 'reselect'

const galleryImages = state => state.gallery.images

export const thumbnails = createSelector(
	galleryImages,
	images => images.map(image => image.thumb)
)

export const mainImages = createSelector(
	galleryImages,
	images => images.map(image => image.regular)
)

export const selectedImage = state => state.gallery.selectedImage
export const contentOfSelectedImage = createSelector(
	selectedImage,
	state => state.gallery.content,
	(imageId, content) => content[imageId]
)
