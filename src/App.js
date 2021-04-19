import React from 'react'
import Battle from './components/Battle'
import Nav from './components/Nav'
import Popular from './components/Popular'
import { ThemeProvider } from './contexts/theme'

class App extends React.Component {
	state = {
		them: 'light',	
		toggleTheme: () => {
			this.setState(({ theme }) => ({
				theme: theme === 'light' ? 'dark' : 'light'
			}))
		}
	}

	render () {
		return (
			<ThemeProvider value={this.state}>
				<div className={this.state.theme}>
					<div className="container">
						<Nav />
						<Popular />
						{/* <Battle /> */}
					</div>
				</div>
			</ThemeProvider>
		)
	}
}

export default App
