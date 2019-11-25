import React from 'react'
import { Typography, Rate } from 'antd/lib'
import ClaimedBox from '../claimed-box'
import IconWrapper from '../icon-wrapper'
import OpeningHours from '../opening-hours'
import './style.css'

const { Text } = Typography

// TODO: Convert a to div with link style

const mockInfoData = {
	title: 'Pradera Tapas Music Bar',
	isClaimed: true,
	reviewScore: 4.5,
	reviewCount: 142,
	popularityInArea: {
		rank: 504,
		total: 19028,
		area: 'Restaurants in London',
		areaLink: '#',
	},
	price: {
		from: 2,
		to: 3,
	},
	tags: [
		{
			name: 'Mediterranean',
		},
		{
			name: 'Spanish',
			link: 'https://www.tripadvisor.co.uk/Restaurants-g504182-c22-Sutton_Greater_London_England.html',
		},
		{
			name: 'Cuban',
		},
	],
	location: '14 High Street | Hornsey, London N8 7PB, England',
	tel: '+44 20 8340 9400',
	openingHours: {
		isOpenedMessage: 'Opens in 1 min',
		openTable: {},
	},
}

function TagStripe({ tags }) {
	return tags
		.map(tag => (
			<a href={tag.link} key={tag.name}>
				{tag.name}
			</a>
		))
		.reduce((prev, curr) => [prev, ', ', curr])
}

function PriceStripe({ price, currency }) {
	const { link, from, to, cost } = price
	const text = from && to ? `${currency.repeat(from)} - ${currency.repeat(to)}` : cost

	return <a href={link}>{text}</a>
}

const displayNumber = number => Number(number).toLocaleString(undefined, { useGrouping: true })

function InformationBox(props) {
	const { title, isClaimed, style, reviewScore, reviewCount, popularityInArea, price, tags, location, tel } = {
		...props,
		...mockInfoData,
	}
	const { rank, total, area } = popularityInArea
	return (
		<div className="information-box" style={style}>
			<div className="information-box__head">
				<span className="information-box__title">
					<Text>{title}</Text>
				</span>
				<span style={{ marginLeft: '10px' }}>
					<ClaimedBox isClaimed={isClaimed} />
				</span>
			</div>

			<div className="information-box__ranking">
				<span>
					<Rate style={{ fontSize: '15px' }} allowHalf defaultValue={reviewScore} />
					<a href="#">{reviewCount} reviews</a>
				</span>
				<span>
					<strong>#{displayNumber(rank)}</strong> of {displayNumber(total)} <a>{area}</a>
				</span>
				<span>
					<PriceStripe price={price} currency="£" />
				</span>
				<span>
					<TagStripe tags={tags} />
				</span>
			</div>

			<div className="information-box__address">
				<IconWrapper alignIcon="left" icon={{ type: 'environment' }} text={location} />
				<IconWrapper alignIcon="left" icon={{ type: 'phone' }} text={tel} />
				<IconWrapper alignIcon="left" icon={{ type: 'laptop' }} text={<a>Website</a>} />
				<OpeningHours />
			</div>
		</div>
	)
}

export default InformationBox
