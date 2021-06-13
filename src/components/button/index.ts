// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';

// TODO нужен ли этот компонент?

const template = `
button(class=className, id=id).some-class= child
`;

class Button extends Component {
  constructor(props: Props) {
    super('button', props);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default Button;
