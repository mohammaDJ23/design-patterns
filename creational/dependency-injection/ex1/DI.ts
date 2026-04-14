export interface Constructor<T = any> {
    new (...args: any[]): T;
}

type Registrations<T> = {
    deps: Constructor<T>[];
};

export class DIContainer {
    private registrations = new Map<Constructor, Registrations<any>>();
    private instances = new Map<Constructor, any>();
    private resolving = new Set<Constructor>();

    register<T>(target: Constructor<T>, deps: Constructor[] = []) {
        this.registrations.set(target, { deps });
    }

    resolve<T>(target: Constructor<T>): T {
        if (this.instances.has(target)) {
            return this.instances.get(target);
        }

        if (this.resolving.has(target)) {
            throw new Error(`Circular dependency detected: ${target.name}`);
        }

        const registration = this.registrations.get(target);

        if (!registration) {
            throw new Error(`No registration found for: ${target.name}`);
        }

        this.resolving.add(target);

        try {
            const depsInstances = registration.deps.map((dep) => this.resolve(dep));

            const instance = new target(...depsInstances);

            this.instances.set(target, instance);

            return instance;
        } finally {
            this.resolving.delete(target);
        }
    }
}
