import React from 'react'
import PropTypes from 'prop-types'

export type Languages = 'All' | 'JavaScript' | 'Ruby' | 'Java' | 'CSS' | 'Python'

export default function LanguagesNav({ selected, onUpdateLanguage }: {
	selected: Languages
	onUpdateLanguage: (lang: Languages) => void
}) {
	const languages: Languages[] = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

	return (
		<ul className='flex-center'>
			{languages.map(language => (
				<li key={language}>
					<button
						className='btn-clear nav-link'
						style={language === selected ? {
							color: 'rgb(187, 46, 31)'
						} : undefined}
						onClick={() => onUpdateLanguage(language)}
					>
						{language}
					</button>
				</li>
			))}
		</ul>
	)
}

LanguagesNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateLanguage: PropTypes.func.isRequired
}