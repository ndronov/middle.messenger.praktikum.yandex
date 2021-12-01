import pug from 'pug';
import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import './index.scss';

const template = `
button.submit-button(type="submit")= label
`;

class SubmitButton extends Component {
  constructor(props: ComponentProps) {
    super('button', props);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default SubmitButton;
