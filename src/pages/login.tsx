import React, { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Authentication from '../security/authentication'


type Field = {
	value?: any,
	error?: string,
	isValid?: boolean
};

type Form = {
	username: Field,
	password: Field
}

const Login: FunctionComponent = () => {

	const navigate = useNavigate()

	const [form, setForm] = useState<Form>({
		username: { value: '' },
		password: { value: '' },
	})

	const [message, setMessage] = useState<string>('Vous êtes déconnecté. (pikachu / pikachu)')

	/**
	 * Quand la val d'un champ change
	 * @param e
	 */
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const fieldName: string = e.target.name
		const fieldValue: string = e.target.value
		const newField: Field = { [fieldName]: { value: fieldValue } }

		setForm({ ...form, ...newField })
	}

	/**
	 * Vérifie que le formulaire est valide
	 */
	const validateForm = (): boolean | undefined => {
		let newForm: Form = form

		// Validator username
		if (form.username.value.length < 3) {
			const errorMsg: string = 'Votre prénom doit faire au moins 3 caractères de long.'
			const newField: Field = { value: form.username.value, error: errorMsg, isValid: false }
			newForm = { ...newForm, ...{ username: newField } }
		} else {
			const newField: Field = { value: form.username.value, error: '', isValid: true }
			newForm = { ...newForm, ...{ username: newField } }
		}

		// Validator password
		if (form.password.value.length < 6) {
			const errorMsg: string = 'Votre mot de passe doit faire au moins 6 caractères de long.'
			const newField: Field = { value: form.password.value, error: errorMsg, isValid: false }
			newForm = { ...newForm, ...{ password: newField } }
		} else {
			const newField: Field = { value: form.password.value, error: '', isValid: true }
			newForm = { ...newForm, ...{ password: newField } }
		}

		setForm(newForm)

		return newForm.username.isValid && newForm.password.isValid
	}

	/**
	 * Lors de l'envoi du formulaire
	 * @param e
	 */
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isFormValid = validateForm()
		if (isFormValid) {
			setMessage('👉 Tentative de connexion en cours ...')
			Authentication.login(form.username.value, form.password.value).then(isAuthenticated => {
				if (!isAuthenticated) {
					setMessage('🔐 Identifiant ou mot de passe incorrect.')
					return
				}

				navigate('/pokemons')
			})
		}
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<div className="row">
				<div className="col s12 m8 offset-m2">
					<div className="card hoverable">
						<div className="card-stacked">
							<div className="card-content">
								{/* Form message */}
								{message && <div className="form-group">
									<div className="card-panel grey lighten-5">
										{message}
									</div>
								</div>}
								{/* Field username */}
								<div className="form-group">
									<label htmlFor="username">Identifiant</label>
									<input id="username" type="text" name="username" className="form-control"
										   value={form.username.value} onChange={handleInputChange}></input>
									{/* error */}
									{form.username.error &&
										<div className="card-panel red accent-1">
											{form.username.error}
										</div>}
								</div>
								{/* Field password */}
								<div className="form-group">
									<label htmlFor="password">Mot de passe</label>
									<input id="password" type="password" name="password" className="form-control"
										   value={form.password.value} onChange={handleInputChange}></input>
									{/* error */}
									{form.password.error &&
										<div className="card-panel red accent-1">
											{form.password.error}
										</div>}
								</div>
							</div>
							<div className="card-action center">
								{/* Submit button */}
								<button type="submit" className="btn">Valider</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}

export default Login