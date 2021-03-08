import React, { Component } from 'react'
import { fetchPopularRepos } from '../utils/api'
import LanguagesNav from './LanguagesNav'
import ReposGrid from './ReposGrid'

export default class Popular extends Component {
	state = {
		selectedLanguage: 'All',
		repos: {},
		error: null
	}

	componentDidMount () {
		this.updateLanguage(this.state.selectedLanguage)
	}

	updateLanguage = (selectedLanguage) => {
		this.setState({
			selectedLanguage,
			error: null
		})

		if (!this.state.repos[selectedLanguage]) {
			fetchPopularRepos(selectedLanguage)
				.then(data => {
					this.setState(({ repos }) => ({
						repos: {
							...repos,
							[selectedLanguage]: data
						}
					}))
				})
				.catch(error => {
					console.log('Error fetching repos: ', error)

					this.setState({
						error: `There was an error fetching the repositories.`
					})
				})
		}
	}

	isLoading = () => {
		const { selectedLanguage, repos, error } = this.state

		return !repos[selectedLanguage] && error === null
	}

	render() {
		const { selectedLanguage, repos, error } = this.state

		return (
			<>
				<LanguagesNav
					selected={selectedLanguage}
					onUpdateLanguage={this.updateLanguage}
				/>

				{this.isLoading() && <p>LOADING</p>}

				{error && <p className="center-text error">{error}</p>}

				{repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
			</>
		)
	}
}