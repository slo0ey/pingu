import NodeCache from 'node-cache';
import { DataSource } from 'typeorm';
import InMemoryCacheProvider from 'typeorm-in-memory-cache';
import { DATASOURCE } from '../constants/di';
import { container } from 'tsyringe';

export default async function initializeDatabase() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    synchronize: true,
    logging: true,
    timezone: 'z',
    entities: ['dist/entities/*.js'],
    cache: {
      provider() {
        const cache = new NodeCache({
          stdTTL: 600,
          checkperiod: 120,
        });
        return new InMemoryCacheProvider(cache);
      },
    },
  });
  await dataSource.initialize();
  container.register(DATASOURCE, { useValue: dataSource });
}
