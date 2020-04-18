import { QldbSession, Result, TransactionExecutor, PooledQldbDriver, QldbDriver } from 'amazon-qldb-driver-nodejs';
import { ClientConfiguration } from 'aws-sdk/clients/qldbsession';
import { Value } from 'ion-js/dist/commonjs/es6/dom';

const pooledQldbDriver: QldbDriver = createQldbDriver();

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
	const qldbSession: QldbSession = await pooledQldbDriver.getSession();
	return qldbSession;
}

export async function scanTables(session: QldbSession): Promise<string[]> {
	return await session.getTableNames();
}

export async function scanTableForDocuments(txn: TransactionExecutor, tableName: string): Promise<Result> {
	console.log(`Scanning ${tableName}...`);
	const query: string = `SELECT * FROM ${tableName}`;
	return await txn.execute(query).then((result: Result) => {
		return result;
	});
}

export async function insertDocument(
	txn: TransactionExecutor,
	tableName: string,
	documents: object[],
): Promise<Result> {
	const statement: string = `INSERT INTO ${tableName} ?`;
	let result: Result = await txn.execute(statement, documents);
	return result;
}

export async function getById(txn: TransactionExecutor, tableName: string, id: string): Promise<object> {
	const statement: string = `SELECT * from ${tableName} as t where t.id = ?`;
	let result: Result = await txn.execute(statement, id);
	if (!result.getResultList().length) return {};
	return result.getResultList()[0];
}
