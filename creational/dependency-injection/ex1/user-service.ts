import { Database } from './database';

export class UserService {
    constructor(private db: Database) {}

    getUsers() {
        return this.db.query('SELECT * FROM users');
    }
}
