import { Result } from 'amazon-qldb-driver-nodejs';
import { createQldbSession, executeStatement } from './qldbHelper';

export async function insertDocument(tableName: string, documents: object): Promise<object> {
	const statement: string = `INSERT INTO ${tableName} ?`;
	const result = await executeStatement(statement, documents);
	return result[0];
}

export async function getById<T>(tableName: string, id: string | number): Promise<T> {
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

export async function updateDocuments(tableName: string, params: object, document: object): Promise<object> {
	const params_keys = Object.keys(params);
	const params_values = Object.values(params);
	const document_keys = Object.keys(document);
	const document_values = document_keys.map((key) => document[key]);
	const stringified_params = params_keys.map((key) => `t.${key} = ?`).join(' and ');
	const stringified_document = document_keys.map((key) => `t.${key} = ?`).join(' , ');
	const statement: string = `UPDATE ${tableName} as t SET ${stringified_document} where ${stringified_params}`;
	console.log(statement);
	console.log(document_values);
	const result = await executeStatement(statement, ...document_values, ...params_values);
	return result[0];
}

export async function deleteById(tableName: string, id: string): Promise<object> {
	const statement: string = `DELETE from ${tableName} as t where t.id = ?`;
	const result = await executeStatement(statement, id);
	return result[0];
}

export async function find<T>(tableName: string, document: object): Promise<T[]> {
	const keys = Object.keys(document);
	const values = Object.values(document);
	const stringified = keys.map((key) => `t.${key} = ?`).join(' and ');
	const statement: string = `SELECT * from ${tableName} as t where ${stringified}`;
	console.log(statement);
	const result = await executeStatement(statement, ...values);
	return result;
}
