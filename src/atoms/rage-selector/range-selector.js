import React from 'react'
import './style.css'

function RangeSelector({ labelPrefix, onChange, min, max, value, step = 1 }) {
	const rangeSliderRef = React.useRef()
	const [background, setBackground] = React.useState()
	const [sliderCurrentValue, setSliderCurrentValue] = React.useState(value)

	function valueValidation(rangeValues) {
		let computedMin = rangeValues.min || 0
		let computedMax = rangeValues.max || 100
		let computedInitial = value

		if (computedMax < computedMin) {
			const tempMin = computedMin
			computedMin = computedMax;
			computedMax = tempMin;
		}
		
		if (rangeValues.initialValue >= computedMin && rangeValues.initialValue <= computedMax) {
			computedInitial = rangeValues.initialValue
		} else {
			computedInitial = Math.round(((computedMax - computedMin) / 2 + computedMin))
		}

		return {
			min: computedMin,
			max: computedMax,
			initialValue: computedInitial
		}
	}

	const applyFill = React.useCallback((slider) => {
		const settings = {
			fill: '#1abc9c',
			background: '#d7dcdf'
		}
		const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
		const sliderValue = Math.round(slider.value)
		setSliderCurrentValue(sliderValue)
		if (onChange) onChange(sliderValue)
		const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`
		setBackground(bg)
	}, [onChange])


	function inputChangeListener(e) {
		setSliderCurrentValue(e.target.value)
	}

	React.useEffect(() => {
		applyFill(rangeSliderRef.current)
	}, [applyFill, value, sliderCurrentValue])
	
	React.useEffect(() => {
		setSliderCurrentValue(value)
	}, [value])

	const labelText = [labelPrefix, sliderCurrentValue].join(' ')
	const rangeValues = valueValidation({ min, max, initialValue: sliderCurrentValue })

	return (
		<div className="range-selector">
			<div className="range-slider">
				<input
					ref={rangeSliderRef}
					className="range-slider__range"
					type="range"
					step={step}
					min={rangeValues.min}
					max={rangeValues.max}
					style={{ background }}
					value={rangeValues.initialValue}
					onChange={inputChangeListener}
				></input>
			</div>
			<div className="range-label">{labelText}</div>
		</div>
	)
}

export default React.memo(RangeSelector)
