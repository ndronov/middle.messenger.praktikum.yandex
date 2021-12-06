import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import template from './template.pug';
import './index.scss';

class SubmitButton extends Component {
  constructor(props: ComponentProps) {
    super('button', props);
  }

  render(): string {
    return template(this.props);
  }
}

export default SubmitButton;
