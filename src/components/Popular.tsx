import React, { useState, useReducer, useRef, useEffect } from 'react'
import { fetchPopularRepos } from '../utils/api'
import LanguagesNav, { Languages } from './LanguagesNav'
import Loading from './Loading'
import ReposGrid from './ReposGrid'
import { Repo } from '../utils/api'

type PopularReducerActions = { type: 'success', selectedLanguage: Languages, repos: Repo[]} |
							 { type: 'error', error: Error}

interface PopularState extends Partial<Record<Languages, Repo[]>> {
	error: string | null
}

function popluarReducer(state: PopularState, action: PopularReducerActions) {
	if (action.type === 'success') {
		return {
			...state,
			[action.selectedLanguage]: action.repos,
			error: null,
		}
	} else if (action.type === 'error') {
		return {
			...state,
			error: action.error.message
		}
	} else {
		throw new Error(`That action type isn't supported.`)
	}
}

export default function Popular() {
	const [selectedLanguage, setSelectedLanguage] = useState<Languages>('All')
	const [state, dispatch] = useReducer(
		popluarReducer, 
		{ error: null }
	)

	const fetchedLanguages = useRef<string[]>([])

	useEffect(() => {
		if (fetchedLanguages.current.includes(selectedLanguage) === false) {
			fetchedLanguages.current.push(selectedLanguage)

			fetchPopularRepos(selectedLanguage)
				.then((repos) => dispatch({ type: 'success', selectedLanguage, repos }))
				.catch((error) => dispatch({ type: 'error', error }))
		}
	}, [fetchedLanguages, selectedLanguage])

	const isLoading = () => !state[selectedLanguage] && state.error === null

	const selectedRepos = state[selectedLanguage]

	return (
		<>
			<LanguagesNav
				selected={selectedLanguage}
				onUpdateLanguage={setSelectedLanguage}
			/>

			{isLoading() && <Loading text='Fetching Repos' />}

			{state.error && <p className="center-text error">{state.error}</p>}

			{selectedRepos && <ReposGrid repos={selectedRepos} />}
		</>
	)
}


