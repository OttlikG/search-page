import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Icon } from 'antd/lib'
import GalleryComment from './gallery-comment'
import { fetchImages as a_fetchImages } from './action'
import { thumbnails, mainImages, contentOfSelectedImage } from './selector'
import './style.css'
// import IconWrapper from '../../components/icon-wrapper';

const modalRoot = document.getElementById('modal-root')

export class GalleryPortal extends React.Component {
	constructor(props) {
		super(props)
		this.el = document.createElement('div')
	}

	componentDidMount() {
		modalRoot.appendChild(this.el)
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el)
	}

	render() {
		const { children } = this.props
		return ReactDOM.createPortal(children, this.el)
	}
}

// TODO: Show details of image when hover
class Gallery extends Component {
	state = {
		mainImageIndex: 0,
	}

	componentDidMount() {
		const { fetchImages } = this.props
		if (fetchImages) fetchImages()
	}

	calculateNextImage = (currentPosition, distance) => {
		const { mainImages } = this.props
		const { length } = mainImages

		// NOTE: source: https://stackoverflow.com/questions/41274905/how-to-implement-carousel-with-an-array/41274929
		const result = (currentPosition + (distance % length) + length) % length
		return result
	}

	render() {
		const { isOpen, thumbnails, mainImages, contentOfSelectedImage } = this.props
		const { mainImageIndex } = this.state
		const modalGalleryClass = classnames('modal-gallery__background', {
			'modal-gallery--hidden': !isOpen,
		})

		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = null
		}
		return (
			<div className={modalGalleryClass}>
				<div className="modal-gallery__close">
					<Icon type="close" />
				</div>
				<div className="modal-gallery__wrapper">
					<div className="modal-gallery__content" onClick={e => e.stopPropagation()}>
						<div className="modal-gallery__image-viewer">
							<div className="modal-gallery__main-image">
								<span
									className="gallery-main-image__icon-left"
									onClick={() =>
										this.setState({ mainImageIndex: this.calculateNextImage(mainImageIndex, -1) })
									}
								>
									<Icon type="left" style={{ fontSize: '23px' }} />
								</span>
								<img src={mainImages[mainImageIndex]} />

								<span
									className="gallery-main-image__icon-right"
									onClick={() =>
										this.setState({ mainImageIndex: this.calculateNextImage(mainImageIndex, 1) })
									}
								>
									<Icon type="right" style={{ fontSize: '23px' }} />
								</span>
							</div>
							<div className="modal-gallery__carousel">
								<span className="gallery-carousel__icon-left">
									<Icon type="left" />
								</span>
								<span className="gallery-carousel__thumbnail-wrapper">
									{thumbnails.map((thumbnail, index) => (
										<span
											key={thumbnail}
											className="modal-gallery__image-thumbnail"
											onClick={() => this.setState({ mainImageIndex: index })}
										>
											<img src={thumbnail} />
										</span>
									))}
								</span>
								<span className="gallery-carousel__icon-left">
									<Icon type="right" />
								</span>
							</div>
						</div>
						<div className="modal-gallery__comment">
							<GalleryComment contentOfSelectedImage={contentOfSelectedImage} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(props) {
	return {
		thumbnails: thumbnails(props),
		mainImages: mainImages(props),
		contentOfSelectedImage: contentOfSelectedImage(props),
	}
}

export default connect(
	mapStateToProps,
	{ fetchImages: a_fetchImages }
)(Gallery)
