class AppComponent extends Component {
    constructor(options) {
        super(options);
        this.calculator = new CalculatorComponent({
            id: 'calculator',
            parent: this.id,
            template: template.calculatorTemplate
        });
    }

    showComponent(name) {
        this[name].show();
    }
}