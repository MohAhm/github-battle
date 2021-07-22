import React, { useState } from 'react'
import Instructions from './Instructions'
import PlayerInput from './PlayerInput'
import PlayerPreview from './PlayerPreview'
import { Link } from 'react-router-dom'

export default function Battle() {
	const [playerOne, setPlayerOne] = useState<string | null>(null)
	const [playerTwo, setPlayerTwo] = useState<string | null>(null)

	const handleSubmit = (id: string, player: string) => id === 'playerOne' 
		? setPlayerOne(player) 
		: setPlayerTwo(player)

	const handleReset = (id: string) => id === 'playerOne'
		? setPlayerOne(null)
		: setPlayerTwo(null)	
	
	return (
		<>
			<Instructions />

			<div className='players-container'>
				<h1 className='center-text header-lg'>Players</h1>
				<div className='row space-around'>
					{playerOne === null
						?	<PlayerInput
								label='Player One'
								onSubmit={(player) => handleSubmit('playerOne', player)}
							/>
						: 	<PlayerPreview
								username={playerOne}
								label='Player One'
								onReset={() => handleReset('playerOne')}
							/>
					}

					{playerTwo === null
						?	<PlayerInput
								label='Player Two'
								onSubmit={(player) => handleSubmit('playerTwo', player)}
							/>
						:	<PlayerPreview
								username={playerTwo}
								label='Player Two'
								onReset={() => handleReset('playerTwo')}
							/>
					}
				</div>

				{playerOne && playerTwo && (
					<Link
						className='btn btn-dark btn-space'
						to={{
							pathname: '/battle/results',
							search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
						}}
					>
						Battle
					</Link>
				)}
			</div>
		</>
	)
}