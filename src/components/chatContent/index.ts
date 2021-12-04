import { render } from 'pug';
import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import formatTime from '../../utils/formatTime';
import template from './template';
import './index.scss';

class ChatContent extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render(): string {
    return render(template, { ...this.props, formatTime });
  }
}

export default ChatContent;
