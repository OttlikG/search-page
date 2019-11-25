import React from 'react'
import ResponsiveImage from '../../atoms/responsive-image/responsive-image'
import { useTransition, animated } from 'react-spring'
import './style.css'

export default function Carousel({ urls, startIndex = 0 }) {
	const [currentImageIndex, setCurrentImageIndex] = React.useState(startIndex)
	const [pages, setPages] = React.useState()

	const goTo = React.useCallback((amount) => () => {
		if (currentImageIndex + amount === urls.length) {
			setCurrentImageIndex(0)
		} else if (currentImageIndex + amount < 0) {
			setCurrentImageIndex(urls.length - 1)
		} else {
			setCurrentImageIndex(currentImageIndex => currentImageIndex + amount)
		}
	}, [currentImageIndex])

	React.useEffect(() => {
		const pages = urls.map(url => (
			({ style }) => {
				return <animated.div key={url} style={{...style}}><ResponsiveImage url={url} /></animated.div>
			}
		))
		setPages(pages)
	}, [urls])

	const transitions = useTransition(currentImageIndex, i => i, {
		from: {opacity: 0, transform: 'translate3d(100%, 0, 0)'},
		enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)'},
		leave: {opacity: 0, transform: 'translate3d(-50%, 0, 0)'}
	})

	return (
		<div className="carousel">
			<div className="carousel-arrow carousel-arrow-left" onClick={goTo(-1)}>
				<i className="fas fa-chevron-left" />
			</div>
			<div className="carousel-transition">
				{pages && transitions.map(({ item, props, key }) => {
					const Image = pages[item]
					return <Image className="animate-image" style={props} key={key} />
				})}
			</div>
			<div className="carousel-arrow carousel-arrow-right" onClick={goTo(1)}>
				<i className="fas fa-chevron-right" />
			</div>
		</div>
	)
}