import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Link, useHistory } from 'react-router-dom';
import Button from '../styles/Button';

import { useStateValue } from '../state';
import { clearState } from '../state/reducer';

//TODO: Change view based on whether host or not
//TODO: Consider saving key as part of local machine AND/OR state

const RoomLobby = () => {
	const [{ socket, game, key }, dispatch] = useStateValue();
	const [players, setPlayers] = useState<string[]>([]);
	const history = useHistory();

	useEffect(() => {
		if (socket && key) {
			socket.emit('getPlayers', key);
			socket.on('players', (playerNames: string[]) => {
				setPlayers(playerNames);
			});
		} else {
			history.push('/join');
		}
	}, [history, socket, key, game]);

	const handleLeave = () => {
		socket?.close();
		dispatch(clearState());
	};

	if (!game || !key || !socket) return <>...Loading</>;

	return (
		<Lobby>
			<h1>{`${game.title}: ${key}`}</h1>
			<p>Need {game.playerCount - players.length} more players to start</p>
			<ol>
				{players.map(p => <li key={p}>{p}</li>)}
			</ol>
			<Link to="/">
				<Button.Outlined onClick={handleLeave}>Leave</Button.Outlined>
			</Link>
			<Button.Filled>Start</Button.Filled>
		</Lobby>
	);
};

const Lobby = styled.div`
	ol {
		list-style: decimal inside;
		margin-bottom: 20px;
		font-size: 20px;
		font-weight: 300;
	}
`;

export default RoomLobby;