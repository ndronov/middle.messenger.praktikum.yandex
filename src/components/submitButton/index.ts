// @ts-ignore
import pug from 'pug';
import Component, { Props } from '../../modules/component';
import './index.scss';

const template = `
button.submit-button(type="submit")= label
`;

class SubmitButton extends Component {
  constructor(props: Props) {
    super('button', props);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default SubmitButton;
