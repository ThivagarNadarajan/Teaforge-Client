import { createGlobalStyle } from 'styled-components';
import { GlobalStyleProps, Color } from '../types';

export const dark: { [key in Color]?: string } = {
	[Color.Red]: '#e04343',
	[Color.Blue]: '#2f90cc',
	[Color.Green]: '#27d983',
	[Color.BG]: '#292929',
	[Color.FG]: '#454545',
	[Color.Font]: 'white'
};

export const light: { [key in Color]?: string } = {
	[Color.Red]: '#ffe3e3',
	[Color.Blue]: '#bae5ff',
	[Color.BG]: 'white',
	[Color.FG]: '#292929',
	[Color.Font]: 'black'
};

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
	body {
		max-width: 450px; 
		margin: 0 auto;
		text-align: center;
		font-family: Signika, sans-serif;

		background: ${props => props.theme.darkMode ? dark[Color.BG] : light[Color.BG]};
		color: ${props => props.theme.darkMode ? dark[Color.Font] : light[Color.Font]};
	}

	i, p, u {
		font-family: Signika, sans-serif;
		font-weight: 300;
		font-size: 20px;
	}

	u {
		font-size: 25px;
	}

	b {
		font-family: Signika, sans-serif;
		font-size: 20px;
	}

	h1 {
		font-size: 40px;
	}

	h2 {
		font-size: 40px;
	}

	h1, h2, h3, h4 {
		font-family: Kreon, serif;
		text-transform: capitalize;
	}
`;

export default GlobalStyle;