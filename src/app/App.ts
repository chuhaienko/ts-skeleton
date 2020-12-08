
export class App {

	constructor () {
		console.log('started');
	}

	public async init (): Promise<void> {
		console.log('init');
	}

	public async start (): Promise<void> {
		console.log('start');
	}

	public async stop (): Promise<void> {
		console.log('stop');
	}
}
