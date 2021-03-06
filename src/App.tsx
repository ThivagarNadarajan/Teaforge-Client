import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/Global';

import DarkMode from './components/misc/DarkMode';
import Home from './components/Home';
import JoinForm from './components/JoinRoom';
import CreateForm from './components/CreateRoom';
import RoomLobby from './components/RoomLobby';
import Resistance from './components/games/Resistance';

import { Game } from './types';

const App = () => {
	const [darkMode, setdarkMode] = useState(false);
	const toggleTheme = (currTheme: boolean) => {
		setdarkMode(!currTheme);
		const theme = darkMode ? 'light' : 'dark';
		window.localStorage.setItem('theme', theme);
	};

	useEffect(() => {
		if (window.localStorage.getItem('theme') === 'dark') setdarkMode(true);
		else setdarkMode(false);
	}, []);

	return (
		<ThemeProvider theme={{ darkMode }}>
			<DarkMode toggleTheme={toggleTheme} darkMode={darkMode} />
			<GlobalStyle />
			<Switch>
				<Route path={`/${Game.Resistance}/*/play`}>
					<Resistance />
				</Route>

				<Route path={`/${Game.Resistance}/*`}>
					<RoomLobby />
				</Route>

				<Route exact path="/join">
					<JoinForm />
				</Route>

				<Route path={'/create/:gameName'}>
					<CreateForm />
				</Route>

				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</ThemeProvider>
	);
};

export default App;
