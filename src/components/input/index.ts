// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';
import './index.scss';

const template = `
label.label= label
  input.input(type=type, name=inputName)
  span.error= error
`;

class Input extends Component {
  constructor(props: Props) {
    super(
      'label',
      { ...props, eventTargetSelector: 'input' },
    );
  }

  componentDidMount(): void {
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
    this.errorElement.style.display = 'block';
  }

  hideError(): void {
    this.errorElement.style.display = 'none';
  }

  handleFocus(): void {
    this.hideError();
  }

  handleBlur(): void {
    const { value } = this.eventTarget as HTMLInputElement;
    const pattern = this.props.pattern as RegExp;

    if (pattern.test(value) || !value) {
      this.hideError();
    } else {
      this.showError();
    }
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default Input;
