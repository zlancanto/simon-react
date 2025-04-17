import React, { FunctionComponent, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Pokemon from '../models/pokemon'
import POKEMONS from '../models/mock-pokemon'
import formatDate from '../helpers/format-date'
import formatType from '../helpers/format-type'

type Params = { id: string }

const PokemonsDetail: FunctionComponent = () => {

	const match = useParams<Params>()

	const [pokemon, setPokemon] = useState<Pokemon | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		for (let i: number = 0; i < POKEMONS.length; ++i) {
			if (match.id === POKEMONS[i].id.toString()) {
				setPokemon(POKEMONS[i])
				break
			}
		}
	}, [match.id])

	const goToEdit = () => {
		if (pokemon) {
			navigate(`/pokemons/edit/${pokemon.id}`)
		}
	}

	return (
		<div>
			{pokemon ? (
				<div className="row">
					<div className="col s12 m8 offset-m2">
						<h2 className="header center">{pokemon.name}</h2>
						<div className="card hoverable">
							<div className="card-image">
								<img
									src={pokemon.picture}
									alt={pokemon.name}
									style={{ width: '250px', margin: '0 auto' }}
								/>
								<button
									className="btn btn-floating halfway-fab waves-effect waves-light"
									onClick={goToEdit}
								>
									<i className="material-icons">edit</i>
								</button>
							</div>
							<div className="card-stacked">
								<div className="card-content">
									<table className="bordered striped">
										<tbody>
											<tr>
												<td>Nom</td>
												<td>
													<strong>
														{pokemon.name}
													</strong>
												</td>
											</tr>
											<tr>
												<td>Points de vie</td>
												<td>
													<strong>
														{pokemon.hp}
													</strong>
												</td>
											</tr>
											<tr>
												<td>Dégâts</td>
												<td>
													<strong>
														{pokemon.cp}
													</strong>
												</td>
											</tr>
											<tr>
												<td>Types</td>
												<td>
													{pokemon.types.map(
														(type) => (
															<span
																key={type}
																className={formatType(
																	type
																)}
															>
																{type}
															</span>
														)
													)}
												</td>
											</tr>
											<tr>
												<td>Date de création</td>
												<td>
													{formatDate(
														pokemon.createdAt
													)}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="card-action">
									<Link to="/">Retour</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<h4 className="center">Aucun pokémon à afficher !</h4>
			)}
		</div>
	)
}

export default PokemonsDetail
