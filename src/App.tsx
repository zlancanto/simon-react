import React, { FunctionComponent } from 'react'
import PokemonList from './pages/pokemon-list'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PokemonDetail from './pages/pokemon-detail'
import PageNotFound from './pages/page-not-found'
import PokemonEdit from './pages/pokemon-edit'
import Login from './pages/login'
import PrivateRoute from './PrivateRoute'

const App: FunctionComponent = () => {
	return (
		<Router>
			<div>
				{/*Barre de navigation commune à toutes les pages*/}
				<nav>
					<div className="nav-wrapper teal">
						<Link to="/" className="brand-logo center">
							Pokédex
						</Link>
					</div>
				</nav>
				{/*Le système de gestion des routes de notre app*/}
				<Routes>
					{/* Route publique pour la page de login */}
					<Route path="/login" element={<Login />} />

					{/* Routes protégées */}
					<Route element={<PrivateRoute />}>
						<Route path="/" element={<PokemonList />} />
						<Route path="/pokemons" element={<PokemonList />} />
						<Route path="/pokemons/edit/:id" element={<PokemonEdit />} />
						<Route path="/pokemons/:id" element={<PokemonDetail />} />
					</Route>

					{/* 404 Not Found */}
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
