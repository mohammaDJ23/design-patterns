import { ObjectPool } from './pool';
import { DatabaseConnection } from './database-connection';
import { HttpClient } from './http-client';
import { Worker } from './worker';

const databaseConnectionPool = new ObjectPool({
    create: () => new DatabaseConnection(),
    maxSize: 2,
});

const databaseConnection = databaseConnectionPool.acquire();
databaseConnection.connect();
databaseConnectionPool.release(databaseConnection);

databaseConnectionPool.acquire();
databaseConnection.connect();
databaseConnectionPool.release(databaseConnection);

const httpClientPool = new ObjectPool({
    create: () => new HttpClient(),
    maxSize: 3,
});

const httpClient = httpClientPool.acquire();
httpClient.setHeader('x-Token', 'aijsdhfuiashduifh87asueyf87hwer7fha8s7duhf87aysd78fyau8sdyf87uiasydf78y8sd7fa8sdyf');
httpClient.fetch();
httpClientPool.release(httpClient);

const workerPool = new ObjectPool({
    create: () => new Worker(),
    maxSize: 1,
});

const worker = workerPool.acquire();
worker.run(() => {});
workerPool.release(worker);
