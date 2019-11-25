import React from 'react'
import cn from 'classnames'
import './style.css'

export default function PriceInput({ text, className, onChange }) {
	function handlePriceChange(e) {
		onChange(e.target.value)
	}

	return (
		<div className={cn('price-input', className)}>
			<input
				date-testid="price-input"
				onChange={handlePriceChange}
			>
				{text}
			</input>
		</div>
	)
}