import pug from 'pug';
import Component from '../modules/component';
import { ComponentProps } from '../types';
import '../styles/errorPages.scss';

const metaData = [{
  code: 404,
  label: 'Не туда попали',
}, {
  code: 500,
  label: 'Мы уже фиксим',
}];

const unknownErrorMetaLabel = 'Неизвестная ошибка';

export const getErrorMeta = (code: number): ErrorMeta => {
  const metaByCode = metaData.find((m) => m.code === code);

  return metaByCode ?? { code, label: unknownErrorMetaLabel };
};

const template = `
div.error-page
  span.code= meta.code
  span.label= meta.label
  a.link(href="/") Назад к чатам
`;

interface ErrorMeta extends ComponentProps {
  code: number;
  label: string;
}

class ErrorPage extends Component {
  constructor(meta: ErrorMeta) {
    super('div', {
      hasFlow: true,
      meta,
    });
  }

  render(): string {
    return pug.render(template, { meta: this.props.meta });
  }
}

export default ErrorPage;
