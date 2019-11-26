import React from 'react'
import cn from 'classnames'
import './style.css'

function Dropdown({ data, placeholder = 'Select', onChange, value }) {
	const [selectedIndex, selectItem] = React.useState(value)
	const [isDropdownToggled, toggleDropdown] = React.useState(false)
	
	function handleOnClick(e) {
		const selectedValue = e.target.value
		onChange(selectedValue)
		selectItem(selectedValue)
		toggleDropdown()
	}
	function handleDropdownToggle() {
		toggleDropdown(!isDropdownToggled)
	}
	const active = data.find(item => {
		return item.id === selectedIndex
	})

	return (
		<div className="dropdown" onClick={handleDropdownToggle}>
			<div className="dropdown__active-option">
				{active ? active.label : placeholder}
			</div>
			<div className="dropdown__arrow-down"><i className="fas fa-angle-down"></i></div>
			<ul
				className={cn('dropdown__menu', {
				'dropdown__menu--active': isDropdownToggled
				})}
				onClick={handleOnClick}
			>
				{data.map(item => (
					<li {...(selectedIndex === item.id ? {className: 'selected-item'} : {})} key={item.id} value={item.id}>{item.label}</li>
				))}
			</ul>
		</div>
	)
}

export default React.memo(Dropdown)
