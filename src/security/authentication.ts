export default class Authentication {

	static isAuthenticated: boolean = false;

	static login(username: string, password: string): Promise<boolean> {

		const isAuthenticated = (username === 'pikachu' && password === 'pikachu')

		return new Promise<boolean>(resolve => {
			setTimeout(() => {
				this.isAuthenticated = isAuthenticated
				resolve(isAuthenticated)
			}, 1000);
		})
	}
}