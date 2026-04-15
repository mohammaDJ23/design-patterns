import { Injectable } from './injectable';

@Injectable()
export class Database {
    query(sql: string) {
        console.log('[DB]', sql);
        return [];
    }
}
