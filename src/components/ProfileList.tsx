import React from 'react'
import PropTypes from 'prop-types'
import { FaBriefcase, FaCompass, FaUser, FaUserFriends, FaUsers } from 'react-icons/fa'
import Tooltip from './Tooltip'
import { User } from '../utils/api'

export default function ProfileList({ profile }: {profile: User}) {
	return (
		<div>
			<ul className='card-list'>
				<li>
					<FaUser color='rgb(239, 115, 115)' size={22} />
					{profile.name}
				</li>
				{profile.location && (
					<li>
						<Tooltip text="User's location">
							<FaCompass color='rgb(144, 115, 255)' size={22} />
							{profile.location}
						</Tooltip>
					</li>
				)}
				{profile.company && (
					<li>
						<Tooltip text="User's company">
							<FaBriefcase color='#795548' size={22} />
							{profile.company}
						</Tooltip>
					</li>
				)}
				<li>
					<FaUsers color='rgb(129, 195, 245)' size={22} />
					{profile.followers.toLocaleString()} followers
				</li>
				<li>
					<FaUserFriends color='rgb(64, 183, 95)' size={22} />
					{profile.following.toLocaleString()} following
				</li>
			</ul>
		</div>
	)
}

ProfileList.propTypes = {
	profile: PropTypes.object.isRequired,
}