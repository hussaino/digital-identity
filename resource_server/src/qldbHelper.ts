import { QldbSession, PooledQldbDriver, QldbDriver, Result } from 'amazon-qldb-driver-nodejs';
import { ClientConfiguration } from 'aws-sdk/clients/qldbsession';
import { Value } from 'ion-js/dist/commonjs/es6/dom';

let qldbSession: QldbSession;

export function closeQldbSession(session: QldbSession): void {
	if (null != session) {
		session.close();
	}
}
export function createQldbDriver(
	ledgerName: string = 'AbsherLedger',
	serviceConfigurationOptions: ClientConfiguration = {},
): QldbDriver {
	const qldbDriver: QldbDriver = new PooledQldbDriver(ledgerName, serviceConfigurationOptions);
	return qldbDriver;
}

export async function createQldbSession(): Promise<QldbSession> {
	if (!qldbSession) {
		const pooledQldbDriver: QldbDriver = createQldbDriver();
		qldbSession = await pooledQldbDriver.getSession();
	}
	// const qldbSession: QldbSession = await pooledQldbDriver.getSession();
	return qldbSession;
}

export async function executeStatement(statement: string, ...args): Promise<any> {
	const session = await createQldbSession();
	let result: Result = await session.executeLambda(async (txn) => {
		return await txn.execute(statement, ...args);
	});
	return JSON.parse(JSON.stringify(result.getResultList()));
}
