import React, { Component } from 'react'
import LanguagesNav from './LanguagesNav'

export default class Popular extends Component {
	state = {
		selectedLanguage: 'All'
	}

	updateLanguage = (selectedLanguage) => {
		this.setState({
			selectedLanguage
		})
	}

	render() {
		const { selectedLanguage } = this.state

		return (
			<>
				<LanguagesNav
					selected={selectedLanguage}
					onUpdateLanguage={this.updateLanguage}
				/>
			</>
		)
	}
}
