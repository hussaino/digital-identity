import { Result } from 'amazon-qldb-driver-nodejs';
import { createQldbSession, executeStatement } from './qldbHelper';

export async function insertDocument(tableName: string, documents: object[]): Promise<object> {
	const statement: string = `INSERT INTO ${tableName} ?`;
	const result = await executeStatement(statement, documents);
	return result[0];
}

export async function getById(tableName: string, id: string): Promise<object> {
	const statement: string = `SELECT * from ${tableName} as t where t.id = ?`;
	const result = await executeStatement(statement, id);
	return result[0];
}

export async function updateById(tableName: string, id: string, document: object): Promise<object> {
	const keys = Object.keys(document);
	const values = Object.values(document);
	const stringified = keys.map((key) => `t.${key} = ? `).join(',');
	const statement: string = `UPDATE ${tableName} as t SET ${stringified} where t.id= ?`;
	console.log(statement);
	const result = await executeStatement(statement, ...values, id);
	return result[0];
}

export async function deleteById(tableName: string, id: string): Promise<object> {
	const statement: string = `DELETE from ${tableName} as t where t.id = ?`;
	const result = await executeStatement(statement, id);
	return result[0];
}
