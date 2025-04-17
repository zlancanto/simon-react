import React, {FunctionComponent} from 'react'
import PokemonList from "./pages/pokemon-list";
import {Link, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import PokemonDetail from "./pages/pokemon-detail";
import PageNotFound from "./pages/page-not-found";
import PokemonEdit from "./pages/pokemon-edit";

const App: FunctionComponent = () => {

    return (
        <Router>
            <div>
                {/*Barre de navigation commune à toutes les pages*/}
                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="brand-logo center">Pokédex</Link>
                    </div>
                </nav>
                {/*Le système de gestion des routes de notre app*/}
                <Switch>
                    <Route exact path="/" component={PokemonList} />
                    <Route exact path="/pokemons" component={PokemonList} />
                    <Route exact path="/pokemons/edit/:id" component={PokemonEdit} />
                    <Route path="/pokemons/:id" component={PokemonDetail} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        </Router>
    )
}

export default App;