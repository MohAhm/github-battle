import React, { useReducer, useEffect } from 'react'
import { battle, Player } from '../utils/api'
import Card from './Card'
import ProfileList from './ProfileList'
import Loading from './Loading'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

interface BattleState {
	loading: boolean
	error: string | null
	winner: Player | null
	loser: Player | null
}

type BattleAction = { type: 'success', winner: Player, loser: Player } |
					{ type: 'error', message: string }

function battleReducer(state: BattleState, action: BattleAction): BattleState {
	if (action.type === 'success') {
		return {
			winner: action.winner,
			loser: action.loser,
			error: null,
			loading: false
		}
	} else if (action.type === 'error') {
		return {
			...state,
			error: action.message,
			loading: false
		}
	} else {
		throw new Error(`That action type isn't supported`)
	}
}

export default function Results({ location }: {location: {search: string}}) {
	const { playerOne, playerTwo } = queryString.parse(location.search)
	const [state, dispatch] = useReducer(
		battleReducer, 
		{ winner: null, loser: null, error: null, loading: true }
	)

	useEffect(() => {
		battle([ playerOne, playerTwo ] as [string, string])
			.then((players) => dispatch({ type: 'success', winner: players[0], loser: players[1]}))
			.catch(({ message }) => dispatch({ type: 'error', message }))
	}, [playerOne, playerTwo])

	const { winner, loser, error, loading } = state

	if (loading === true || !winner || !loser) {
		return <Loading />
	}

	if (error) {
		return (
			<p className="center-text error">{error}</p>
		)
	}

	return (
		<>
			<div className="grid space-around container-sm">
				<Card
					header={winner.score === loser.score ? 'Tie' : 'Winner'}
					subheader={`Score: ${winner.score.toLocaleString()}`}
					avatar={winner.profile.avatar_url}
					href={winner.profile.html_url}
					name={winner.profile.login}
				>
					<ProfileList profile={winner.profile} />
				</Card>

				<Card
					header={winner.score === loser.score ? 'Tie' : 'Winner'}
					subheader={`Score: ${loser.score.toLocaleString()}`}
					avatar={loser.profile.avatar_url}
					href={loser.profile.html_url}
					name={loser.profile.login}
				>
					<ProfileList profile={loser.profile} />
				</Card>
			</div>

			<Link
				className='btn btn-dark btn-space'
				to='/battle'
			>
				Reset
			</Link>
		</>
	)
}
