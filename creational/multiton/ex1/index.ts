type TKey = string | number | symbol;

class Multiton {
    private static instances: Map<TKey, unknown> = new Map();

    public static getInstance<T>(key: TKey, factory: () => T): T {
        if (!Multiton.instances.has(key)) {
            const instance = factory();
            if (!instance || instance === undefined || instance === null) {
                throw new Error(`Factory returned invalid instance for key: ${String(key)}`);
            }
            Multiton.instances.set(key, instance);
        }
        return Multiton.instances.get(key) as T;
    }
}

class DatabaseConnection {
    constructor(public readonly tenantId: string) {}

    query(sql: string) {
        console.log(`[${this.tenantId}] Executing: ${sql}`);
    }
}

const db1 = Multiton.getInstance('tenant-1', () => new DatabaseConnection('tenant-1'));
const db2 = Multiton.getInstance('tenant-2', () => new DatabaseConnection('tenant-2'));
const db1Again = Multiton.getInstance('tenant-1', () => new DatabaseConnection('tenant-1'));

console.log(db1 === db1Again);
console.log(db1 === db2);
