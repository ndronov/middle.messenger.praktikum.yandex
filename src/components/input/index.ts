// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';
import './index.scss';

// TODO доработать

const defaultTemplate = `
input(placeholder=placeholder, type=type, name=inputName, class=className)
`;

const labeledTemplate = `
label(class=className).label= label
  input.input(type=type, name=inputName)
  span.error= error
`;

class Input extends Component {
  constructor(props: Props) {
    super(
      props.label ? 'label' : 'input',
      {
        ...props,
        eventTargetSelector: props.label ? 'input' : null,
      },
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
    if (this.props.label) {
      this.errorElement.style.display = 'block';
      return;
    }

    console.log(this.props.error);
  }

  hideError(): void {
    if (this.props.label) {
      this.errorElement.style.display = 'none';
    }
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

  get template(): string {
    return this.props.label ? labeledTemplate : defaultTemplate;
  }

  render(): string {
    return pug.render(this.template, this.props);
  }
}

export default Input;
