import React from 'react'
import Battle from './components/Battle'
import Popular from './components/Popular'

class App extends React.Component {
	render () {
		return (
			<div className="container">
				{/* <Popular /> */}
				<Battle />
			</div>
		)
	}
}

export default App
