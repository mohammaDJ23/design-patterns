import { Injectable } from './injectable';
import { Database } from './database';

@Injectable()
export class UserService {
    constructor(private db: Database) {}

    getUsers() {
        return this.db.query('SELECT * FROM users');
    }
}
