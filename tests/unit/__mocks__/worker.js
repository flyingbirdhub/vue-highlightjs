jest.mock('web-worker:./worker.ts', () => {
    const { FormatUtil } = require('@/common');
    const worker = {
      postMessage: jest.fn(),
      onmessage: jest.fn(),
      onerror: jest.fn(),
    };
    worker.postMessage.mockImplementation((data) => {
      const formatter = new FormatUtil(data);
      worker.onmessage({
        data: formatter.content,
      });
    });
    const Worker = function () {
      return worker;
    };
    return Worker;
});
