import Pokemon from '../models/pokemon'
import { FunctionComponent, useState } from 'react'
import React from 'react'
import formatType from '../helpers/format-type'
import { useNavigate } from 'react-router-dom'

type Props = {
	pokemon: Pokemon
}

type Field = {
	value?: any
	error?: string
	isValid?: boolean
}

type Form = {
	name: Field
	hp: Field
	cp: Field
	types: Field
}

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {

	const [form, setForm] = useState<Form>({
		name: { value: pokemon.name, isValid: true },
		hp: { value: pokemon.hp, isValid: true },
		cp: { value: pokemon.cp, isValid: true },
		types: { value: pokemon.types, isValid: true },
	})

	const navigate = useNavigate()

	const types: string[] = [
		'Plante',
		'Feu',
		'Eau',
		'Insecte',
		'Normal',
		'Electrik',
		'Poisson',
		'Fée',
		'Vol',
		'Combat',
		'Psy',
	]

	const hasType = (type: string): boolean => {
		return form.types.value.includes(type)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName: string = e.target.name
		const fieldValue: string = e.target.value
		const newField: Field = { [fieldName]: { value: fieldValue } }

		setForm({ ...form, [fieldName]: newField })
	}

	const selectType = (
		type: string,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const checked: boolean = e.target.checked
		let newField: Field

		if (checked) {
			/* Si l'utilisateur coche un type, on l'add à la list des types du pokemon */
			const newType: string[] = form.types.value.concat([type])
			newField = { value: newType }
		} else {
			/* Si l'utilisateur décoche un type, on le retire de la list des types du pokemon */
			const newType: string[] = form.types.value.filter(
				(currentType: string) => currentType !== type
			)
			newField = { value: newType }
		}

		setForm({ ...form, ...{ types: newField } })
	}

	const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {

		e.preventDefault()
		const isFormValid: boolean|undefined = validateForm()

		if (isFormValid) {
			navigate(`/pokemons/${pokemon.id}`)
		}
	}

	/**
	 * Validation du formulaire
	 */
	const validateForm = () => {

		let newForm: Form = form
		const regExpName: RegExp = new RegExp(/^[a-zA-Zàéè]{3,25}$/)
		const regExpHp: RegExp = new RegExp(/^[0-9]{1,3}$/)
		const regExpCp: RegExp = new RegExp(/^[0-9]{1,2}$/)

		// Validator name
		if (!regExpName.test(form.name.value)) {
			const errorMsg: string = 'Le nom du pokémon est requis (1-25)'
			const newField: Field = {
				value: form.name.value,
				error: errorMsg,
				isValid: false
			}
			newForm = { ...newForm, ...{ name: newField } }
		}
		else {
			const newField: Field = {
				value: form.name.value,
				error: '',
				isValid: true
			}
			newForm = { ...newForm, ...{ name: newField } }
		}

		// Validator hp
		if (!regExpHp.test(form.hp.value)) {
			const errorMsg: string = 'Les points de vie sont compris entre 0 et 999'
			const newField: Field = {
				value: form.hp.value,
				error: errorMsg,
				isValid: false
			}
			newForm = {...newForm, ...{hp: newField}}
		}
		else {
			const newField: Field = {
				value: form.hp.value,
				error: '',
				isValid: true
			}
			newForm = { ...newForm, ...{ hp: newField } }
		}

		// Validator cp
		if (!regExpCp.test(form.cp.value)) {
			const errorMsg: string = 'Les dégats sont compris entre 0 et 99'
			const newField: Field = {
				value: form.cp.value,
				error: errorMsg,
				isValid: false
			}
			newForm = { ...newForm, ...{ cp: newField } }
		}
		else {
			const newField: Field = {
				value: form.cp.value,
				error: '',
				isValid: true
			}
			newForm = { ...newForm, ...{ cp: newField } }
		}

		setForm(newForm)
		return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid
	}

	/**
	 * Verifie si un type peut être coché ou décoché
	 * @param type
	 */
	const isTypesValid = (type: string): boolean => {

		// Le type ne peut être décoché
		if (form.types.value.length === 1 && hasType(type)) {
			return false
		}

		// Le type ne peut être coché
		if (form.types.value.length >= 3 && !hasType(type)) {
			return false
		}

		return true
	}

	return (
		<form onSubmit={handleSumit}>
			<div className="row">
				<div className="col s12 m8 offset-m2">
					<div className="card hoverable">
						<div className="card-image">
							<img
								src={pokemon.picture}
								alt={pokemon.name}
								style={{ width: '250px', margin: '0 auto' }}
							/>
						</div>
						<div className="card-stacked">
							<div className="card-content">
								{/*Pokemon name*/}
								<div className="form-group">
									<label htmlFor="name">Nom</label>
									<input
										id="name"
										name="name"
										type="text"
										value={form.name.value}
										className="form-control"
										onChange={(e) => handleInputChange(e)}
									/>

									{form.name.error && (
										<div className="card-panel red accent-1">
											{form.name.error}
										</div>
									)}
								</div>
								{/*Pokemon hp*/}
								<div className="form-group">
									<label htmlFor="hp">Point de vie</label>
									<input
										id="hp"
										name="hp"
										type="number"
										value={form.hp.value}
										className="form-control"
										onChange={(e) => handleInputChange(e)}
									/>

									{form.hp.error && (
										<div className="card-panel red accent-1">
											{form.hp.error}
										</div>
									)}
								</div>
								{/*Pokemon cp*/}
								<div className="form-group">
									<label htmlFor="cp">Dégâts</label>
									<input
										id="cp"
										name="cp"
										type="number"
										value={form.cp.value}
										className="form-control"
										onChange={(e) => handleInputChange(e)}
									/>

									{form.cp.error && (
										<div className="card-panel red accent-1">
											{form.cp.error}
										</div>
									)}
								</div>
								{/*Pokemon types*/}
								<div className="form-group">
									<label htmlFor="hp">Types</label>
									{types.map((type) => (
										<div
											key={type}
											style={{ marginBottom: '10px' }}
										>
											<label>
												<input
													id={type}
													type="checkbox"
													className="filled-in"
													value={type}
													checked={hasType(type)}
													disabled={!isTypesValid(type)}
													onChange={(e) =>
														selectType(type, e)
													}
												/>
												<span>
													<p
														className={formatType(
															type
														)}
													>
														{type}
													</p>
												</span>
											</label>
										</div>
									))}
								</div>
							</div>
							<div className="card-action center">
								{/*Submit button*/}
								<button className="btn" type="submit">
									Valider
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}

export default PokemonForm
