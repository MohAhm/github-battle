import React, { useState, useReducer, useRef, useEffect } from 'react'
import { fetchPopularRepos } from '../utils/api'
import LanguagesNav from './LanguagesNav'
import Loading from './Loading'
import ReposGrid from './ReposGrid'

function popluarReducer(state, action) {
	if (action.type === 'success') {
		return {
			...state,
			[action.selectedLanguage]: action.repos,
			error: null,
		}
	} else if (action.type === 'error') {
		return {
			...state,
			error: action.action.message
		}
	} else {
		throw new Error(`That action type isn't supported.`)
	}
}

export default function Popular() {
	const [selectedLanguage, setSelectedLanguage] = useState('All')
	const [state, dispatch] = useReducer(
		popluarReducer, 
		{ error: null }
	)

	const fetchedLanguages = useRef([])

	useEffect(() => {
		if (fetchedLanguages.current.includes(selectedLanguage) === false) {
			fetchedLanguages.current.push(selectedLanguage)

			fetchPopularRepos(selectedLanguage)
				.then((repos) => dispatch({ type: 'success', selectedLanguage, repos }))
				.catch((error) => dispatch({ type: 'error', error }))
		}
	}, [fetchedLanguages, selectedLanguage])

	const isLoading = () => !state[selectedLanguage] && state.error === null

	return (
		<>
			<LanguagesNav
				selected={selectedLanguage}
				onUpdateLanguage={setSelectedLanguage}
			/>

			{isLoading() && <Loading text='Fetching Repos' />}

			{state.error && <p className="center-text error">{state.error}</p>}

			{state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
		</>
	)
}


