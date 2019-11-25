import React from 'react'
import { Breadcrumb } from 'antd/lib'
import InformationBox from '../components/information-box'
import RestaurantGallery from '../components/restaurant-gallery'

function RestaurantProfile() {
	return (
		<div className="restaurant-profile">
			<div className="topper">
				<div className="topper__content">
					<Breadcrumb>
						<Breadcrumb.Item>Europe</Breadcrumb.Item>
						<Breadcrumb.Item>United Kingdom (UK)</Breadcrumb.Item>
						<Breadcrumb.Item>England</Breadcrumb.Item>
						<Breadcrumb.Item>London</Breadcrumb.Item>
						<Breadcrumb.Item>London Restaurants</Breadcrumb.Item>
						<Breadcrumb.Item>Pradera Tapas Music Bar</Breadcrumb.Item>
					</Breadcrumb>
					<InformationBox style={{ marginTop: '10px' }} />
				</div>
			</div>
			<RestaurantGallery />
			{/* <div>
        t
        t
        t
        t
        t
        t
        t
      </div> */}
		</div>
	)
}

export default RestaurantProfile
