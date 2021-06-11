// @ts-ignore
import pug from 'pug';
import Block, { Props } from '../../modules/block';

const template = `
button.submit-button(type="submit")= label
`;

class SubmitButton extends Block {
  constructor(props: Props) {
    super('button', props);
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

export default SubmitButton;
