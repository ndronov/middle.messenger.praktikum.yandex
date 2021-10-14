// @ts-ignore
import pug from 'pug';
import Component from '../../modules/component';
import router from '../../modules/router';
import { LinkProps } from '../../types';

const template = `
a(class=className, href=href)= label
`;

class Link extends Component {
  protected readonly props: LinkProps;

  constructor(props: LinkProps) {
    super(
      'a',
      {
        hasFlow: true,
        ...props,
      },
    );
  }

  componentDidMount(): void {
    this.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e: Event): void {
    e.preventDefault();
    router.go(this.props.href);
  }

  render(): string {
    return pug.render(template, this.props);
  }
}

export default Link;
