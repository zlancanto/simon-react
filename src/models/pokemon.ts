export default class Pokemon {
    // 1. Typage des propriétés d'un pokemon
    id: number
    hp: number
    cp: number
    name: string
    picture: string
    types: Array<string>
    createdAt: Date

    // 2. Définitions des valeurs par défaut des propriétés d'un pokemon
    constructor(
        id: number,
        hp: number = 100,
        cp: number = 10,
        name: string = 'name',
        picture: string = 'http://...',
        types: Array<string> = ['normal'],
        createdAt: Date = new Date()
    ) {
        // 3. initialisation des propriétés
        this.id = id
        this.hp = hp
        this.cp = cp
        this.name = name
        this.picture = picture
        this.types = types
        this.createdAt = createdAt
    }
}