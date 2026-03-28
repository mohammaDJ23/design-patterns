// Prototype interface
interface DocumentPrototype {
    clone(): DocumentPrototype;
}

// Concrete Prototype
class Document implements DocumentPrototype {
    constructor(
        public title: string,
        public content: string,
        public author: string,
        public tags: string[],
        public metadata: Map<string, any>,
    ) {}

    // Deep clone method
    clone(): Document {
        // Create deep copies of reference types
        const clonedTags = [...this.tags];
        const clonedMetadata = new Map(this.metadata);

        return new Document(this.title, this.content, this.author, clonedTags, clonedMetadata);
    }

    // Helper method to display document info
    display(): void {
        console.log(`
            Title: ${this.title}
            Author: ${this.author}
            Tags: ${this.tags.join(', ')}
            Metadata: ${JSON.stringify(Object.fromEntries(this.metadata))}
            Content: ${this.content.substring(0, 50)}...
        `);
    }

    // Builder-like methods for customization
    withTitle(title: string): this {
        this.title = title;
        return this;
    }

    withContent(content: string): this {
        this.content = content;
        return this;
    }

    addTag(tag: string): this {
        this.tags.push(tag);
        return this;
    }
}

// Usage example
class DocumentGenerator {
    private templates: Map<string, Document> = new Map();

    // Register prototype templates
    registerTemplate(name: string, document: Document): void {
        this.templates.set(name, document);
    }

    // Generate document from template with customizations
    generateFromTemplate(templateName: string, customizations?: (doc: Document) => void): Document {
        const template = this.templates.get(templateName);
        if (!template) {
            throw new Error(`Template "${templateName}" not found`);
        }

        const newDocument = template.clone();

        if (customizations) {
            customizations(newDocument);
        }

        return newDocument;
    }
}

// Production example
function main() {
    const generator = new DocumentGenerator();

    // Create base invoice template
    const invoiceTemplate = new Document(
        'Invoice Template',
        'Thank you for your business! Total amount: $___',
        'Finance Dept',
        ['invoice', 'template'],
        new Map([
            ['type', 'invoice'],
            ['version', '1.0'],
        ]),
    );

    // Register templates
    generator.registerTemplate('standard_invoice', invoiceTemplate);

    // Generate actual invoices from template
    const invoice1 = generator.generateFromTemplate('standard_invoice', (doc) => {
        doc.withTitle('Invoice #INV-2024-001')
            .withContent('Thank you for your business! Total amount: $1,500.00')
            .addTag('urgent');
    });

    const invoice2 = generator.generateFromTemplate('standard_invoice', (doc) => {
        doc.withTitle('Invoice #INV-2024-002')
            .withContent('Thank you for your business! Total amount: $2,300.00')
            .addTag('paid');
    });

    // Verify they're different objects
    console.log('Are invoices different objects?', invoice1 !== invoice2);
    console.log('\n--- Invoice 1 ---');
    invoice1.display();
    console.log('\n--- Invoice 2 ---');
    invoice2.display();

    // Verify deep cloning works
    console.log('\n--- Deep Clone Verification ---');
    invoice1.tags.push('new-tag');
    console.log('Invoice 1 tags:', invoice1.tags);
    console.log('Invoice 2 tags (unchanged):', invoice2.tags);
}

main();
