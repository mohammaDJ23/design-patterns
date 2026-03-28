interface PaymentProcessor {
    process(amount: number): Promise<{ success: boolean; transactionId: string }>;
    refund(transactionId: string): Promise<boolean>;
}

class CreditCardProcessor implements PaymentProcessor {
    async process(amount: number) {
        console.log(`Processing credit card payment: $${amount}`);
        return {
            success: true,
            transactionId: `CC_${Date.now()}_${Math.random().toString(36)}`,
        };
    }

    async refund(transactionId: string) {
        console.log(`Refunding credit card transaction: ${transactionId}`);
        return true;
    }
}

class PayPalProcessor implements PaymentProcessor {
    async process(amount: number) {
        console.log(`Processing PayPal payment: $${amount}`);
        return {
            success: true,
            transactionId: `PP_${Date.now()}_${Math.random().toString(36)}`,
        };
    }

    async refund(transactionId: string) {
        console.log(`Refunding PayPal transaction: ${transactionId}`);
        return true;
    }
}

class CryptoProcessor implements PaymentProcessor {
    async process(amount: number) {
        console.log(`Processing cryptocurrency payment: $${amount}`);
        return {
            success: true,
            transactionId: `CRYPTO_${Date.now()}_${Math.random().toString(36)}`,
        };
    }

    async refund(transactionId: string) {
        console.log(`Refunding crypto transaction: ${transactionId}`);
        return true;
    }
}

abstract class PaymentFactory {
    abstract createProcessor(): PaymentProcessor;

    async processPayment(amount: number) {
        const processor = this.createProcessor();

        if (amount <= 0) {
            throw new Error('Invalid payment amount');
        }

        console.log(`Starting payment of $${amount}`);
        const result = await processor.process(amount);
        console.log(`Payment completed: ${result.transactionId}`);

        return result;
    }
}

class CreditCardFactory extends PaymentFactory {
    createProcessor(): PaymentProcessor {
        return new CreditCardProcessor();
    }
}

class PayPalFactory extends PaymentFactory {
    createProcessor(): PaymentProcessor {
        return new PayPalProcessor();
    }
}

class CryptoFactory extends PaymentFactory {
    createProcessor(): PaymentProcessor {
        return new CryptoProcessor();
    }
}

async function main() {
    const factories: PaymentFactory[] = [new CreditCardFactory(), new PayPalFactory(), new CryptoFactory()];

    for (const factory of factories) {
        await factory.processPayment(99.99);
        console.log('---');
    }

    const paymentMethod: string = 'paypal';
    let factory: PaymentFactory;

    switch (paymentMethod) {
        case 'creditcard':
            factory = new CreditCardFactory();
            break;
        case 'paypal':
            factory = new PayPalFactory();
            break;
        case 'crypto':
            factory = new CryptoFactory();
            break;
        default:
            throw new Error('Invalid payment method');
    }

    await factory.processPayment(49.99);
}

main().catch(console.error);
