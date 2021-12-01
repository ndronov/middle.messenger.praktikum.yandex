import { render } from 'pug';
import Component from '../modules/component';
import { ComponentProps } from '../types';

const template = `
div
  span(id='text')= text
`;

class TestPageAlfa extends Component {
  constructor(params: ComponentProps) {
    const { tagName = 'div', ...restParams } = params;

    super(
      tagName as string,
      {
        hasFlow: true,
        ...restParams,
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,class-methods-use-this
  async componentDidMount(): Promise<void> {
  }

  render(): string {
    return render(template, this.props);
  }
}

export default TestPageAlfa;
