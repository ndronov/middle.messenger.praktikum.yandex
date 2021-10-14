// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import router from '../../modules/router';
import { LinkProps, RouterLink } from '../../types';

const template = `
a(class=className, href=link)= label
`;

class Link extends Component {
  protected readonly props: LinkProps;

  constructor(props: LinkProps) {
    super(
      'a',
      {
        hasFlow: true,
        ...props,
        link: props.href ?? '#',
      },
    );
  }

  componentDidMount(): void {
    this.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e: Event): void {
    e.preventDefault();

    if (this.props.href) {
      router.go(this.props.href);

      return;
    }

    switch (this.props.go) {
      case RouterLink.Back:
        router.back();
        break;

      case RouterLink.Forward:
        router.forward();
        break;

      default:
        throw new Error('Ошибка перехода по ссылке');
    }
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default Link;
