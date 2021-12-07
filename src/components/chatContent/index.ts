import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import formatTime from '../../utils/formatTime';
import template from './template.pug';
import './index.scss';

class ChatContent extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render(): string {
    return template({ ...this.props, formatTime });
  }
}

export default ChatContent;
