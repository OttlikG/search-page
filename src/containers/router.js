import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd/lib'

import Search from './search'
import RestaurantProfile from './restaurant-profile'

const { Content } = Layout

function AppRouter() {
	return (
		<Router>
			<React.Fragment>
				<Content>
					<div>
						<Switch>
							<Route path="/restaurant" component={RestaurantProfile} />
							<Route path="/" component={Search}/>
						</Switch>
					</div>
				</Content>
			</React.Fragment>
		</Router>
	)
}

export default AppRouter
