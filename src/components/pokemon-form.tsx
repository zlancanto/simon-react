import Pokemon from "../models/pokemon";
import {FunctionComponent, useState} from "react";
import React from "react";
import formatType from "../helpers/format-type";
import {useHistory} from "react-router-dom";

type Props = {
    pokemon: Pokemon
}

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
}

type Form = {
    name: Field,
    hp: Field,
    cp: Field,
    types: Field
}

const PokemonForm: FunctionComponent<Props> = ({pokemon}) => {

    const [form, setForm] = useState<Form>({
        name: {value: pokemon.name, isValid: true},
        hp: {value: pokemon.hp, isValid: true},
        cp: {value: pokemon.cp, isValid: true},
        types: {value: pokemon.types, isValid: true},
    })

    const history = useHistory();

    const types: string[] = [
        "Plante",
        "Feu",
        "Eau",
        "Insecte",
        "Normal",
        "Electrik",
        "Poisson",
        "Fée",
        "Vol",
        "Combat",
        "Psy"
    ]

    const hasType = (type: string): boolean => {
        return form.types.value.includes(type);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name
        const fieldValue: string = e.target.value;
        const newField: Field = {[fieldName]: {value: fieldValue}}

        setForm({...form, [fieldName]: newField})
    }

    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const checked: boolean = e.target.checked
        let newField: Field

        if (checked) {
            /* Si l'utilisateur coche un type, on l'add à la list des types du pokemon */
            const newType: string[] = form.types.value.concat([type])
            newField = {value: newType}
        }else {
            /* Si l'utilisateur décoche un type, on le retire de la list des types du pokemon */
            const newType: string[] = form.types.value.filter((currentType: string) => currentType !== type)
            newField = {value: newType}
        }

        setForm({...form, ...{types: newField}})
    }

    const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form)
        history.push(`/pokemons/${pokemon.id}`)
    }

    return (
        <form onSubmit={handleSumit}>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        <div className="card-image">
                            <img src={pokemon.picture}
                                 alt={pokemon.name}
                                 style={{width:'250px', margin:'0 auto'}}
                            />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                {/*Pokemon name*/}
                                <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input id="name" name="name" type="text" value={form.name.value} className="form-control" onChange={e => handleInputChange(e)} />
                                </div>
                                {/*Pokemon hp*/}
                                <div className="form-group">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input id="hp" name="hp" type="number" value={form.hp.value} className="form-control" onChange={e => handleInputChange(e)} />
                                </div>
                                {/*Pokemon cp*/}
                                <div className="form-group">
                                    <label htmlFor="cp">Dégâts</label>
                                    <input id="cp" name="cp" type="number" value={form.cp.value} className="form-control" onChange={e => handleInputChange(e)} />
                                </div>
                                {/*Pokemon types*/}
                                <div className="form-group">
                                    <label htmlFor="hp">Types</label>
                                    {types.map((type) => (
                                        <div key={type} style={{marginBottom: '10px'}}>
                                            <label>
                                                <input id={type} type="checkbox" className="filled-in" value={type} checked={hasType(type)} onChange={(e) => selectType(type, e)} />
                                                <span>
                                                    <p className={formatType(type)}>{type}</p>
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-action center">
                                {/*Submit button*/}
                                <button className="btn" type="submit">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PokemonForm