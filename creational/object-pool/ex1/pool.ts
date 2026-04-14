interface Factory<T> {
    (): T;
}

interface PoolOptions<T> {
    create: Factory<T>;
    maxSize: number;
}

export class ObjectPool<T> {
    private available: T[] = [];
    private inUses: Set<T> = new Set<T>();

    private readonly create: Factory<T>;
    private readonly maxSize: number;

    constructor(options: PoolOptions<T>) {
        this.create = options.create;
        this.maxSize = options.maxSize;
    }

    acquire(): T {
        let obj: T;

        if (this.availableSize() > 0) {
            obj = this.available.pop()!;
        } else {
            if (this.size() >= this.maxSize) {
                throw new Error('Pool exhausted');
            }

            obj = this.create();
        }

        this.inUses.add(obj);

        return obj;
    }

    release(obj: T): void {
        if (!this.inUses.has(obj)) {
            throw new Error('Object not found');
        }

        this.inUses.delete(obj);
        this.available.push(obj);
    }

    size(): number {
        return this.availableSize() + this.inUsesSize();
    }

    availableSize(): number {
        return this.available.length;
    }

    inUsesSize(): number {
        return this.inUses.size;
    }
}
