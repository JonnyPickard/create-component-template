const { logError, logInfo, logSuccess } = require('../logger');

describe('logger', () => {
  it('logError', () => {
    const mockFn = jest.fn();
    const mockMessage = 'testError';
    console.error = mockFn;

    logError(mockMessage);
    expect(mockFn.mock.calls[0][0].message).toContain(mockMessage);
  });

  it('logInfo', () => {
    const mockFn = jest.fn();
    const mockMessage = 'testInfo';
    console.log = mockFn;

    logInfo(mockMessage);
    expect(mockFn.mock.calls[0][0]).toContain(mockMessage);
  });

  it('logSuccess', () => {
    const mockFn = jest.fn();
    const mockMessage = 'testSuccess';
    console.log = mockFn;

    logSuccess(mockMessage);
    expect(mockFn.mock.calls[0][0]).toContain(mockMessage);
  });
});