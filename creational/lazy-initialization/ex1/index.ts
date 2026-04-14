class AsyncDatabase {
    private static instance: AsyncDatabase | null = null;
    private static initializing: Promise<AsyncDatabase> | null = null;

    private constructor() {}

    private async connect() {
        console.log('🔌 Async DB connecting...');
        await new Promise((r) => setTimeout(r, 1000));
    }

    public static async getInstance(): Promise<AsyncDatabase> {
        if (AsyncDatabase.instance) {
            return AsyncDatabase.instance;
        }

        if (!AsyncDatabase.initializing) {
            AsyncDatabase.initializing = (async () => {
                const db = new AsyncDatabase();
                await db.connect();
                AsyncDatabase.instance = db;
                return db;
            })();
        }

        return AsyncDatabase.initializing;
    }

    public query(sql: string) {
        console.log(`Executing query: ${sql}`);
    }
}

async function run() {
    try {
        const db = await AsyncDatabase.getInstance();
        console.log(db);
    } catch (error) {
        console.error(error);
    }
}

run();
