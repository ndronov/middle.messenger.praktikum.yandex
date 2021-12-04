import { render } from 'pug';
import Component from '../../modules/component';
import { InputProps, ValidationOptions } from '../../types';
import template from './template';
import './index.scss';

class Input extends Component {
  readonly props: InputProps;

  constructor(props: InputProps) {
    super(
      'label',
      {
        ...props,
        eventTargetSelector: 'input',
      },
    );
  }

  async componentDidMount(): Promise<void> {
    if (this.props.pattern) {
      this.setValidationFlow();
    }
  }

  setValidationFlow(): void {
    this.setInnerHandler('blur', this.handleBlur.bind(this));
    this.setInnerHandler('focus', this.handleFocus.bind(this));
  }

  get errorElement(): HTMLElement {
    return this.content.querySelector('.error') as HTMLElement;
  }

  showError(): void {
    this.errorElement.classList.remove('error_hidden');
  }

  hideError(): void {
    this.errorElement.classList.add('error_hidden');
  }

  handleFocus(): void {
    this.hideError();
  }

  handleBlur(): void {
    this.validate();
  }

  validate(options: ValidationOptions = {}): void {
    const { pattern } = this.props;

    if (!pattern) {
      return;
    }

    const { triggerOnEmpty } = options;
    const isEmpty = !this.value;

    if (isEmpty && triggerOnEmpty) {
      this.showError();
      return;
    }

    if (isEmpty && !triggerOnEmpty) {
      this.hideError();
      return;
    }

    const isValid = pattern.test(this.value);

    if (!isValid) {
      this.showError();
    }
  }

  get value(): string {
    const { value } = this.eventTarget as HTMLInputElement;
    return value;
  }

  render(): string {
    return render(template, this.props);
  }
}

export default Input;
