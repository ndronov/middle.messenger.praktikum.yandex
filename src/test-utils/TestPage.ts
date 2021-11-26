// @ts-ignore
import pug from 'pug';
import Component from '../modules/component';
import { ComponentProps } from '../types';

const template = `
div
  span= text
`;

class TestPage extends Component {
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

  // eslint-disable-next-line class-methods-use-this
  render(): string {
    return pug.render(template, this.props);
  }
}

export default TestPage;
