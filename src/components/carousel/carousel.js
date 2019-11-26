import React from "react";
import ResponsiveImage from "../../atoms/responsive-image/responsive-image";
import { useTransition, animated } from "react-spring";
import "./style.css";

const deriveCarouselPosition = urls => (position) => {
	if (position < 0) return urls.length + position
	if (position >= 0) return position % urls.length
}

const mapIndex = (item, imageWindow, urls, currentImageIndex, windowedUrls) => {
	let computedIndex = item
	if (item > imageWindow.right) {
		const distance = urls.length - 1 - currentImageIndex
		const mappedIndex = windowedUrls.length - 1 - distance;

		computedIndex = mappedIndex
	}

	return computedIndex
}

function Carousel({ urls = [] }) {
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
	const [imageWindow, setImageWindow] = React.useState({ left: - 1, right: 1 });
	const deriveUrlPosition = deriveCarouselPosition(urls)

	const goTo = amount => {
		let calculatedIndex
		if (currentImageIndex + amount >= urls.length) {
			calculatedIndex = 0
		} else if (currentImageIndex + amount < 0) {
			calculatedIndex = urls.length + amount
		}
		
		setCurrentImageIndex(currentImageIndex => {
			if (calculatedIndex) return calculatedIndex
			return currentImageIndex + amount
		})

		setImageWindow(windowObj => {
			if (amount > 0 && deriveUrlPosition(currentImageIndex + 1) === windowObj.right) {
				return { ...windowObj, right: windowObj.right + amount }
			} else if (deriveUrlPosition(currentImageIndex - 1) === urls.length + windowObj.left) {
				return { ...windowObj, left: windowObj.left + amount }
			}

			return windowObj
		})
	}

	const windowedUrls = urls.length && Math.abs(imageWindow.left) + imageWindow.right >= urls.length
		? urls
		: [...urls].slice(0, imageWindow.right + 1).concat([...urls].slice(imageWindow.left))

	const pages = windowedUrls.map((url, index) => ({ style }) => {
		return (
			<animated.div key={url} style={{ ...style }} index={index}>
				<ResponsiveImage url={url} />
			</animated.div>
		);
	});

	const transitions = useTransition(currentImageIndex, null, {
		from: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
		enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
		leave: { opacity: 0, transform: "translate3d(-50%, 0, 0)" }
	});

	return (
		<div className="carousel">
			<div
				className="carousel-arrow carousel-arrow-left"
				onClick={() => goTo(-1)}
			>
				<i className="fas fa-chevron-left" />
			</div>
			<div className="carousel-transition">
				{urls.length && transitions ? (
					transitions.map(({ item, props, key, index }) => {
						const comp = mapIndex(item, imageWindow, urls, currentImageIndex, windowedUrls)
						
						const Image = pages[comp];
						return (
							<Image
								className="animate-image"
								style={props}
								key={key}
							/>
						);
					})
				) : (
					<div className="carousel__loading-background" />
				)}
			</div>
			<div
				className="carousel-arrow carousel-arrow-right"
				onClick={() => goTo(1)}
			>
				<i className="fas fa-chevron-right" />
			</div>
		</div>
	);
}

export default Carousel
