import React, { FunctionComponent, useState } from 'react'
import Pokemon from '../models/pokemon'
import './pokemon-card.css'
import formatDate from '../helpers/format-date'
import formatType from '../helpers/format-type'
import { useNavigate } from 'react-router-dom'

type Props = {
	pokemon: Pokemon
	borderColor?: string
}

const PokemonCard: FunctionComponent<Props> = ({
	pokemon,
	borderColor = '#009688',
}) => {
	const [color, setColor] = useState<string>()
	const navigate = useNavigate()

	const showBorder = () => {
		setColor(borderColor)
	}

	const hideBorder = () => {
		setColor('#F5F5F5')
	}

	const goToPokemon = () => {
		navigate(`/pokemons/${pokemon.id}`)
	}

	return (
		<div
			className="col s6 m4"
			onMouseEnter={showBorder}
			onMouseLeave={hideBorder}
			onClick={goToPokemon}
		>
			<div className="card horizontal" style={{ borderColor: color }}>
				<div className="card-image">
					<img src={pokemon.picture} alt={pokemon.name} />
				</div>
				<div className="card-stacked">
					<div className="card-content">
						<p>{pokemon.name}</p>
						<p>
							<small>{formatDate(pokemon.createdAt)}</small>
						</p>
						{pokemon.types.map((type) => (
							<span className={formatType(type)} key={type}>
								{type}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PokemonCard
