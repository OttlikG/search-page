import React from 'react'
import cn from 'classnames'
import './style.css'

export default function IconText({ text, icon }) {
	return (
		<span className='icon-text'>
			<i className={cn('fas', 'fa-2x', icon)} />
			<span className="icon-text__text">{text}</span>
		</span>
	)
}