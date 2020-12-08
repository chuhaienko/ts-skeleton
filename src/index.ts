import {App} from './app/App';


const SHUTDOWN_TIMEOUT = 10;

void (async () => {
	const app = new App();

	setImmediate(async () => {
		await app.init();
		await app.start();
	});

	/**
	 * NODE ERROR HANDLERS
	 */
	process.on('uncaughtException', async (err) => {
		console.error(err);

		try {
			await app.stop();
		} finally {
			process.exit(1);
		}
	});

	process.on('unhandledRejection', async (p) => {
		console.error(p);

		try {
			await app.stop();
		} finally {
			process.exit(1);
		}
	});

	process.on('SIGTERM', async () => {
		await gracefulShutdown('SIGTERM');
	});
	process.on('SIGINT', async () => {
		await gracefulShutdown('SIGINT');
	});
	process.on('SIGHUP', async () => {
		await gracefulShutdown('SIGHUP');
	});

	async function gracefulShutdown (signal: string): Promise<void> {
		console.log(`SIGNAL: ${signal}`);

		try {
			setTimeout(() => {
				process.exit(2);
			}, SHUTDOWN_TIMEOUT * 1000);

			await app.stop();
		} finally {
			process.exit(1);
		}
	}
})();
