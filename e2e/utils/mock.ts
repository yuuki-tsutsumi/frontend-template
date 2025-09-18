import { MockServiceWorker, createWorkerFixture } from 'playwright-msw';
import { test as base, expect } from '@playwright/test';
import { handlers } from '../../src/mocks/handlers.js';

const test = base.extend<{
  worker: MockServiceWorker;
}>({
  worker: createWorkerFixture(handlers),
});

export { test, expect };
