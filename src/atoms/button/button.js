import React from 'react'
import { Button as AntButton } from 'antd'
import './style.css'

export default function Button({children, onClick}) {
	return (
		<div className="button-wrapper" data-test="button">
			<AntButton type="primary" onClick={onClick}>{children}</AntButton>
		</div>
	)
}