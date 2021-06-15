// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import { ComponentProps } from '../../types';
import '../../styles/errorPages.scss';

const template = `
div.error-page
  span.code= meta.code
  span.label= meta.label
  a.link(href="/sections/chatList/index.html") Назад к чатам
`;

interface ErrorMeta extends ComponentProps {
  code: number;
  label: string;
}

class ErrorPage extends Component {
  constructor(root: string, meta: ErrorMeta) {
    super('div', {
      root,
      meta,
    });
  }

  render(): string {
    return pug.render(template, { meta: this.props.meta });
  }
}

export default ErrorPage;
