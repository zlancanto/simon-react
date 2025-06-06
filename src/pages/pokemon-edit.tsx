import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PokemonForm from '../components/pokemon-form'
import Pokemon from '../models/pokemon'
import React from 'react'
import POKEMONS from '../models/mock-pokemon'

type Params = {
	id: string
}

const PokemonEdit: FunctionComponent = () => {

	const match = useParams<Params>()
	const [pokemon, setPokemon] = useState<Pokemon | null>(null)

	useEffect(() => {
		for (let i: number = 0; i < POKEMONS.length; ++i) {
			if (match.id === POKEMONS[i].id.toString()) {
				setPokemon(POKEMONS[i])
				break
			}
		}
	}, [match.id])

	return (
		<div>
			{pokemon ? (
				<div className="row">
					<h2 className="header center">Editer {pokemon.name}</h2>
					<PokemonForm pokemon={pokemon}></PokemonForm>
				</div>
			) : (
				<h4 className="center">Aucun pokémon à afficher !</h4>
			)}
		</div>
	)
}

export default PokemonEdit
