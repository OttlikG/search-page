import React, { useState } from 'react'
import ConnectedModal, { GalleryPortal } from '../../modules/gallery'
import './style.css'
import a from '../../assets/images/carousel/a.jpg'
import b from '../../assets/images/carousel/b.jpg'
import c from '../../assets/images/carousel/c.jpg'
import d from '../../assets/images/carousel/d.jpg'
import e from '../../assets/images/carousel/e.jpg'

// NOTE: What's best to display image as attribute or backgroundImage
function RestaurantGallery() {
	const [isOpen, toggleModal] = useState(false)

	return (
		<div className="restaurant-gallery" onClick={() => toggleModal(!isOpen)} role="dialog">
			<div className="restaurant-gallery__big-tile">
				<img src={a} alt="" />
			</div>
			<div className="restaurant-gallery_flow">
				<div className="restaurant-gallery__top-flow">
					<img src={b} alt="" />
					<img src={c} alt="" />
				</div>
				<div className="restaurant-gallery__bottom-flow">
					<img src={d} alt="" />
					<img src={e} alt="" />
				</div>
			</div>
			<GalleryPortal>
				<ConnectedModal isOpen={isOpen} toggleModal={toggleModal} />
			</GalleryPortal>
		</div>
	)
}

export default RestaurantGallery
