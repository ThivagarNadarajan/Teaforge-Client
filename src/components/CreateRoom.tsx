import React, { useState } from 'react';
import io from 'socket.io-client';

import { Link, useHistory } from 'react-router-dom';
import Form from '../styles/Form';
import Button from '../styles/Button';

import { Games } from '../types';
import { useStateValue } from '../state';
import { setSocket, setKey } from '../state/reducer';

const CreateForm: React.FC<{ game: Games }> = ({ game }) => {
	const history = useHistory();
	const [, dispatch] = useStateValue();
	const [name, setName] = useState('');

	const handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const socket = io.connect(`http://localhost:3001/${game}`);
		dispatch(setSocket(socket));

		socket.emit('create', name);
		socket.on('roomKey', (key: string) => {
			dispatch(setKey(key));
			history.push(`/${game}/${key}`);
		});
	};

	return (
		<>
			<h1>Create Room</h1>
			<Form>
				<input placeholder="Name"
					value={name} onChange={event => setName(event.target.value)}>
				</input>
				<br />
				<Button.Filled onClick={handleCreate}>Create</Button.Filled>
				<Link to="/">
					<Button.Outlined>Cancel</Button.Outlined>
				</Link>
			</Form>
		</>
	);
};

export default CreateForm;