import React from 'react'
import { Popover } from 'antd/lib'
import _ from 'lodash'
import IconWrapper from '../icon-wrapper'
import './style.css'

const data = {
	monday: {
		message: 'closed',
	},
	tuesday: {
		from: '18:00',
		to: '0:00',
	},
	wednesday: {
		from: '18:00',
		to: '0:00',
	},
	thursday: {
		from: '18:00',
		to: '0:00',
	},
	friday: {
		from: '18:00',
		to: '0:00',
	},
	saturday: {
		from: '18:00',
		to: '0:00',
	},
	sunday: {
		from: '17:00',
		to: '23:00',
	},
}

const dayMapper = {
	monday: 'Mon',
	tuesday: 'Thu',
	wednesday: 'Wed',
	thursday: 'Thu',
	friday: 'Fri',
	saturday: 'Sut',
	sunday: 'Sun',
}

function groupConsecutiveEqualOpeningHours(normalizedData) {
	return normalizedData.reduce((acc, cur) => {
		const [day, openingHours] = cur
		if (acc.length > 0) {
			const [prevDay, prevOpeningHours] = acc[acc.length - 1]
			if (_.isEqual(openingHours, prevOpeningHours)) {
				prevDay[1] = day
				return acc
			}
		}

		acc.push([[day], openingHours])
		return acc
	}, [])
}

function OpeningHoursTable(data) {
	const normalizedData = Object.keys(data).reduce((acc, day) => [...acc, [dayMapper[day], data[day]]], [])
	const grouped = groupConsecutiveEqualOpeningHours(normalizedData)
	const humanReadable = grouped.map(([dayInterval, openingHours]) => [dayInterval.join(' - '), openingHours])
	return (
		<ul className="opening-hours-table">
			{humanReadable.map(([dayInterval, openingHours]) => {
				const openingHoursText = openingHours.message || `${openingHours.from} - ${openingHours.to}`

				return (
					<li className="opening-hours__list" key={dayInterval}>
						<span className="opening-hours__day-interval">{dayInterval}</span>
						<span className="opening-hours__text">{openingHoursText}</span>
					</li>
				)
			})}
		</ul>
	)
}

function GenerateMessageOfOpeningHours(openingHours, timezoneOfBusiness) {
	const timeNowAtBusiness = new Date().toLocaleTimeString('en-us', { timeZone: timezoneOfBusiness, hour12: false })
	const day = new Date().toLocaleString('en-us', { timeZone: timezoneOfBusiness, weekday: 'long' }).toLowerCase()

	const localTimestamp = new Date(`01/01/2001 ${timeNowAtBusiness}`).getTime()
	const openTimestamp = new Date(`01/01/2001 ${openingHours[day].from}`).getTime()
	const closeTimestamp = new Date(`01/01/2001 ${openingHours[day].to}`).getTime()
	const isOpen = openTimestamp <= localTimestamp && closeTimestamp >= localTimestamp
	const isOpenMessage = `${isOpen ? 'Opened' : 'Closed'} now`
	const currentOpeningHours = isOpen && `${openingHours[day].from} - ${openingHours[day].to}`

	return (
		<span>
			<strong>{isOpenMessage}</strong>
			{isOpen && `: ${currentOpeningHours}`}
		</span>
	)
}

function OpeningHours(props) {
	const { openingHours = data, timezoneOfBusiness = 'Europe/London' } = props
	const content = OpeningHoursTable(data)
	const openingHoursMessage = GenerateMessageOfOpeningHours(openingHours, timezoneOfBusiness)
	return (
		<span style={{ cursor: 'pointer' }}>
			<Popover placement="bottomLeft" title="Hours" content={content} trigger="hover">
				<span>
					<IconWrapper alignIcon="left" icon={{ type: 'clock-circle' }} text={openingHoursMessage} />
				</span>
			</Popover>
		</span>
	)
}

export default OpeningHours
