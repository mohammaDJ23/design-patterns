import 'reflect-metadata';

const INJECTABLE_KEY = Symbol('injectable');

export function Injectable(): ClassDecorator {
    return function (target: any) {
        Reflect.defineMetadata(INJECTABLE_KEY, true, target);
    };
}

export function isInjectable(target: any): boolean {
    return Reflect.getMetadata(INJECTABLE_KEY, target) === true;
}
