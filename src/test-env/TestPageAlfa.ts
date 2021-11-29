import { render } from 'pug';
import Component from '../modules/component';
import { ComponentProps } from '../types';

const template = `
div
  span(id='text')= text
`;

class TestPageAlfa extends Component {
  constructor(params: ComponentProps) {
    super(
      'div',
      {
        hasFlow: true,
        text: params.text,
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
