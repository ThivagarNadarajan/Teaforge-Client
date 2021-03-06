import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Link, useHistory } from 'react-router-dom';
import Message from './misc/Message';
import Button from '../styles/Button';

import { RoomInfo, Color } from '../types';
import { useStateValue } from '../state';
import { clearState } from '../state/reducer';
import { setGame, setMessage } from '../state/reducer';

const RoomLobby = () => {
	const [{ socket, name, game, key }, dispatch] = useStateValue();
	const history = useHistory();

	useEffect(() => {
		if (game && socket && key) {
			socket.on('update', (game: RoomInfo) => {
				dispatch(setGame(game));
			});
			socket.on('disconnect', () => {
				socket.disconnect();
				history.push('/join');
				dispatch(setMessage('Server went down'));
			});
			socket.on('start', () => {
				history.push(`/${game.name}/${key}/play`);
			});
		} else {
			history.push('/join');
		}
	}, [history, socket, key, game, dispatch]);

	if (!game || !name || !key || !socket) {
		return <>...Loading</>;
	}

	const handleLeave = () => {
		socket.close();
		dispatch(clearState());
	};

	const handleStart = () => {
		socket.emit('start');
	};

	const startButton = () => {
		if (name === game.host) {
			return (
				<Button.Filled onClick={handleStart} color={Color.Blue}>
					Start
				</Button.Filled>
			);
		}
		return null;
	};

	const playersNeeded = (game.reqPlayers - game.players.length) > 0
		? (game.reqPlayers - game.players.length)
		: 0;

	return (
		<Lobby>
			<h1>{`${game.name}: ${key}`}</h1>
			<p>Need {playersNeeded} more players to start</p>
			<Message />
			<ol>
				{game.players.map(p =>
					(game.host === p)
						? <li key={p}>{p} (Host)</li>
						: <li key={p}>{p}</li>
				)}
			</ol>
			<Link to="/">
				<Button.Filled onClick={handleLeave}>Leave</Button.Filled>
			</Link>
			{startButton()}
		</Lobby>
	);
};

const Lobby = styled.div`
	ol {
		list-style: decimal;
		
		width: max-content;
		margin: auto;
		margin-bottom: 20px;
	
		font-size: 20px;
		font-weight: 300;

		li {
			text-align: left;
		}
	}
`;

export default RoomLobby;