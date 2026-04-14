export class Worker {
    private busy: Boolean = false;

    constructor() {}

    run(task: () => void) {
        this.busy = true;
        task();
        this.busy = false;
    }

    reset() {
        this.busy = false;
    }
}
