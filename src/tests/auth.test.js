'use strict';
const {
  requestInvalidMock,
  replyMock,
  requestValidMock
} = require('./mockData');

const {
  MISSING_PERMISSIONS,
  INVALID_PERMISSIONS
} = require('./../auth/_consts');
const { authZ } = require('./../auth');
const { extractTokenData } = require('./../auth/decodeToken');

describe('Token Decoding ', () => {
  test('Empty request object', async done => {
    const tokenInfo = extractTokenData({});
    expect(tokenInfo.is_authorized).toBe(false);
    done();
  });

  test('Without authorization header', async done => {
    const tokenInfo = extractTokenData({ headers: {}, body: {}, query: {} });
    expect(tokenInfo.is_authorized).toBe(false);
    done();
  });

  test('With Invalid Token', async done => {
    const tokenInfo = extractTokenData(requestInvalidMock);
    expect(tokenInfo.is_authorized).toBe(false);
    done();
  });

  test('With valid Token', async done => {
    const tokenInfo = extractTokenData(requestValidMock);
    expect(tokenInfo.is_authorized).toBe(true);
    done();
  });
});

describe('Authorization Function ', () => {
  test('With Valid Permissions', async () => {
    const Authorization = authZ(['read:product-types', 'generate:reports']);
    expect(!Authorization(requestValidMock, {}, () => {})).toBeTruthy();
  });

  test('Passing permissions without array', async () => {
    function testing() {
      authZ('read:product-types', {});
    }
    expect(testing).toThrowError(new Error(INVALID_PERMISSIONS));
  });

  test('Empty permissions array', async () => {
    function testing() {
      authZ([], {});
    }
    expect(testing).toThrowError(new Error(MISSING_PERMISSIONS));
  });

  test('Unauthorized request', async () => {
    const Authorization = authZ(['read:product-type']);
    expect(Authorization(requestValidMock, replyMock, () => {})).toBe(403);
  });
});
