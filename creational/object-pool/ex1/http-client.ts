export class HttpClient {
    private header: Record<string, string> = {};

    constructor() {}

    setHeader(key: string, value: string) {
        this.header[key] = value;
    }

    fetch() {
        console.log('Fetching a new request.', this.header);
    }
}
