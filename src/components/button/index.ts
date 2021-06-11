// @ts-ignore
import pug from 'pug';
import Block, { Props } from '../../modules/block';

const template = `
button(class=className, id=id).some-class= child
`;

class Button extends Block {
  constructor(props: Props) {
    super('button', props);
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: Props): void {
    // TODO реализовать метод
    // eslint-disable-next-line no-console
    console.log('componentDidMount:', oldProps);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default Button;
