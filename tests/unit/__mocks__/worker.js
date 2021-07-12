jest.mock('web-worker:./worker.ts', () => {
    const Worker = jest.fn();
    Worker.prototype.postMessage = jest.fn();
    Worker.prototype.onmessage = jest.fn();
    Worker.prototype.onerror = jest.fn();
    return Worker;
});
