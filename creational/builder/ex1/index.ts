// Product class we want to build
class DatabaseQuery {
    constructor(
        public readonly table: string,
        public readonly fields: string[],
        public readonly where: Map<string, any>,
        public readonly limit: number,
        public readonly orderBy: string,
        public readonly useCache: boolean,
    ) {}

    execute(): Promise<any[]> {
        console.log(`Executing query on ${this.table}...`);
        // Simulate database execution
        return Promise.resolve([]);
    }
}

// Builder class
class QueryBuilder {
    private table: string = '';
    private fields: string[] = ['*'];
    private where: Map<string, any> = new Map();
    private limit: number = 100;
    private orderBy: string = '';
    private useCache: boolean = false;

    setTable(table: string): this {
        this.table = table;
        return this;
    }

    select(fields: string[]): this {
        this.fields = fields;
        return this;
    }

    addWhere(field: string, value: any): this {
        this.where.set(field, value);
        return this;
    }

    setLimit(limit: number): this {
        this.limit = limit;
        return this;
    }

    setOrderBy(orderBy: string): this {
        this.orderBy = orderBy;
        return this;
    }

    enableCache(): this {
        this.useCache = true;
        return this;
    }

    build(): DatabaseQuery {
        if (!this.table) {
            throw new Error('Table name is required');
        }

        return new DatabaseQuery(this.table, this.fields, this.where, this.limit, this.orderBy, this.useCache);
    }
}

// Usage example
async function main() {
    // Building a complex query with method chaining
    const query = new QueryBuilder()
        .setTable('users')
        .select(['id', 'name', 'email'])
        .addWhere('age', 25)
        .addWhere('active', true)
        .setOrderBy('name ASC')
        .setLimit(10)
        .enableCache()
        .build();

    const results = await query.execute();
    console.log('Query built:', query);
}

main();
