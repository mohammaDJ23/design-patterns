import 'reflect-metadata';
import { isInjectable } from './injectable';

interface Constructor<T = any> {
    new (...args: any[]): T;
}

export class DIContainer {
    private singletons = new Map<Constructor, any>();

    resolve<T>(target: Constructor<T>): T {
        if (!isInjectable(target)) {
            throw new Error(`${target.name} is not injectable`);
        }

        if (this.singletons.has(target)) {
            return this.singletons.get(target);
        }

        const paramTypes: Constructor[] = Reflect.getMetadata('design:paramtypes', target) || [];

        const dependencies = paramTypes.map((dep) => {
            return this.resolve(dep);
        });

        const instance = new target(...dependencies);

        this.singletons.set(target, instance);

        return instance;
    }
}
