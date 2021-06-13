// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';

const template = `
button(class=className, id=id).some-class= child
`;

class Button extends Component {
  constructor(props: Props) {
    super('button', props);
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: Props): void {
    // TODO реализовать метод
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default Button;
