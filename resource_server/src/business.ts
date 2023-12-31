import * as aws from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { PooledQldbDriver, QldbSession } from 'amazon-qldb-driver-nodejs';
import {
  insertDocument,
  getById,
  updateById,
  deleteById,
  find,
  updateDocuments,
} from './qldbCRUD';
import { errorResponse, successResponse } from './response';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { Business, BusinessAuthorizationRequest } from './models/Business';
import { AccessList } from './models/AccessList';
import { sendWSMessage, decrypt, encrypt } from './websocket';
import { CustomerEncryptedData } from './models/Customer';

export const create: APIGatewayProxyHandler = async (event) => {
  if (!event.body) {
    return errorResponse(event, 400, { msg: 'Malformed Request' });
  }
  const data = JSON.parse(event.body);
  if (!data || !data.id) {
    return errorResponse(event, 400, { msg: 'Missing ID in body' });
  }
  let res = await insertDocument('BUSINESSES', data);
  return successResponse(event, res);
};

export const get: APIGatewayProxyHandler = async (event) => {
  const data = event.pathParameters;
  const business = await getById<Business>('BUSINESSES', data!.id);
  return successResponse(event, business);
};

export const update: APIGatewayProxyHandler = async (event) => {
  if (!event.body) {
    return errorResponse(event, 400, { msg: 'Malformed Request' });
  }
  const data = JSON.parse(event.body);
  if (!data || !data.id) {
    return errorResponse(event, 400, { msg: 'Missing ID in body' });
  }
  const businessInfo = { ...data };
  delete businessInfo.id;
  const business = await updateById('BUSINESSES', data.id, businessInfo);
  return successResponse(event, business);
};

export const remove: APIGatewayProxyHandler = async (event) => {
  const data = event.pathParameters;
  const business = await deleteById('BUSINESSES', data!.id);
  return successResponse(event, business);
};

export const auth: APIGatewayProxyHandler = async (event) => {
  const user = event.requestContext.authorizer!.claims;
  return successResponse(event, user);
};

export const requestAuthorization: APIGatewayProxyHandler = async (event) => {
  if (!event.body) {
    return errorResponse(event, 400, { msg: 'Malformed Request' });
  }
  const data: BusinessAuthorizationRequest = JSON.parse(event.body);
  const error = ['businessId', 'businessWS', 'customerQR'].filter(
    (key) => !data[key],
  );
  if (error.length) {
    return errorResponse(event, 400, {
      msg: 'Missing keys in body',
      params: error,
    });
  }
  const customerEncrypted = decrypt(data.customerQR)!;
  const old = await find<AccessList>('ACCESS_LIST', {
    businessId: data.businessId,
    customerId: customerEncrypted.id,
  });
  const business = await getById<Business>('BUSINESSES', data.businessId);
  let res;
  const { businessWS } = data;
  if (old.length == 0) {
    res = await insertDocument('ACCESS_LIST', {
      businessId: data.businessId,
      customerId: customerEncrypted.id,
      accessList: business.accessList,
      status: 'requested',
    });
  } else {
    res = await updateDocuments(
      'ACCESS_LIST',
      {
        business: data.businessId,
        customer: customerEncrypted.id,
      },
      { accessList: business.accessList, status: 'requested' },
    );
  }

  try {
    const encrypted = encrypt({
      id: data.businessId,
      connectionId: businessWS,
    });
    await sendWSMessage(customerEncrypted.connectionId, {
      action: 'authorizationRequest',
      companyName: business.name,
      requestedInfo: business.accessList,
      businessData: encrypted,
    });
  } catch (error) {
    return errorResponse(event, 500, error);
  }
  return successResponse(event, res);
};

export const history: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters!.id;
  const data = await find<AccessList>('ACCESS_LIST', {
    business: id,
    status: 'approve',
  });
  const info = data.map((request) => {
    return request.customerInfo;
  });
  return successResponse(event, info);
};
