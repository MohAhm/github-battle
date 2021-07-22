import React, { useState, useContext, FormEvent, ChangeEvent } from 'react'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'

export default function PlayerInput({ onSubmit, label }: {onSubmit: (username: string) => void, label: string}) {
	const [username, setUsername] = useState('')
	const theme = useContext(ThemeContext)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		onSubmit(username)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)

	return (
		<form className='column player' onSubmit={handleSubmit}>
			<label htmlFor="username" className="player-label">
				{label}
			</label>
			<div className='row player-inputs'>
				<input
					type='text'
					id='username'
					className={`input-${theme}`}
					placeholder='github username'
					autoComplete='off'
					value={username}
					onChange={handleChange}
				/>
				<button
					className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
					type='submit'
					disabled={!username}
				>
					Submit
				</button>
			</div>
		</form>
	)
}

PlayerInput.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
}