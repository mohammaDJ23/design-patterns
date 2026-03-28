interface Button {
    render(): string;
    onClick(): void;
}

interface Input {
    render(): string;
    setValue(value: string): void;
}

interface Checkbox {
    render(): string;
    toggle(): void;
}

class MaterialButton implements Button {
    constructor(private label: string) {}

    render(): string {
        return `<button class="material-btn ripple">${this.label}</button>`;
    }

    onClick(): void {
        console.log(`Material button clicked: ${this.label}`);
    }
}

class MaterialInput implements Input {
    constructor(private value: string = '') {}

    render(): string {
        return `<input class="material-input" value="${this.value}" />`;
    }

    setValue(value: string): void {
        this.value = value;
        console.log(`Material input value set to: ${value}`);
    }
}

class MaterialCheckbox implements Checkbox {
    constructor(private checked: boolean = false) {}

    render(): string {
        return `<input type="checkbox" class="material-checkbox" ${this.checked ? 'checked' : ''} />`;
    }

    toggle(): void {
        this.checked = !this.checked;
        console.log(`Material checkbox toggled to: ${this.checked}`);
    }
}

class AppleButton implements Button {
    constructor(private label: string) {}

    render(): string {
        return `<button class="apple-btn smooth-corners">${this.label}</button>`;
    }

    onClick(): void {
        console.log(`Apple button tapped: ${this.label}`);
    }
}

class AppleInput implements Input {
    constructor(private value: string = '') {}

    render(): string {
        return `<input class="apple-input rounded" value="${this.value}" />`;
    }

    setValue(value: string): void {
        this.value = value;
        console.log(`Apple input value set to: ${value}`);
    }
}

class AppleCheckbox implements Checkbox {
    constructor(private checked: boolean = false) {}

    render(): string {
        return `<div class="apple-checkbox ${this.checked ? 'checked' : ''}"></div>`;
    }

    toggle(): void {
        this.checked = !this.checked;
        console.log(`Apple checkbox toggled to: ${this.checked}`);
    }
}

interface UIFactory {
    createButton(label: string): Button;
    createInput(initialValue?: string): Input;
    createCheckbox(initialChecked?: boolean): Checkbox;
}

class MaterialUIFactory implements UIFactory {
    createButton(label: string): Button {
        return new MaterialButton(label);
    }

    createInput(initialValue?: string): Input {
        return new MaterialInput(initialValue);
    }

    createCheckbox(initialChecked?: boolean): Checkbox {
        return new MaterialCheckbox(initialChecked);
    }
}

class AppleUIFactory implements UIFactory {
    createButton(label: string): Button {
        return new AppleButton(label);
    }

    createInput(initialValue?: string): Input {
        return new AppleInput(initialValue);
    }

    createCheckbox(initialChecked?: boolean): Checkbox {
        return new AppleCheckbox(initialChecked);
    }
}

class Application {
    private button: Button;
    private input: Input;
    private checkbox: Checkbox;

    constructor(private factory: UIFactory) {
        this.button = factory.createButton('Submit');
        this.input = factory.createInput('Enter text...');
        this.checkbox = factory.createCheckbox(false);
    }

    renderUI(): string {
        return `
      <div class="ui-container">
        ${this.button.render()}
        ${this.input.render()}
        ${this.checkbox.render()}
      </div>
    `;
    }

    simulateUserInteraction(): void {
        this.button.onClick();
        this.input.setValue('User input');
        this.checkbox.toggle();
    }
}

class AppConfig {
    static getUIFactory(): UIFactory {
        const designSystem = process.env.UI_DESIGN_SYSTEM || 'material';

        switch (designSystem) {
            case 'apple':
                return new AppleUIFactory();
            case 'material':
            default:
                return new MaterialUIFactory();
        }
    }
}

const factory = AppConfig.getUIFactory();
const app = new Application(factory);

console.log(app.renderUI());

app.simulateUserInteraction();
