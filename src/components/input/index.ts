// @ts-ignore
import pug from 'pug';
import Block, { Props } from '../../modules/block';
import './index.scss';

const template = `
label.label= label
  input.input(type=type, name=inputName)
`;

class Input extends Block {
  constructor(props: Props) {
    super(
      'label',
      { ...props, eventTargetSelector: 'input' },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: Props): void {
    // TODO реализовать метод
    // eslint-disable-next-line no-console
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default Input;
