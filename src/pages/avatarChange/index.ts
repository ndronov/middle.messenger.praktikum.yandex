import Component from '../../modules/component';
import Link from '../../components/link';
import UserSettingsForm from '../../components/userSettingsForm';
import AvatarForm from '../../components/avatarForm';
import AuthController from '../../controllers/authController';
import UsersController from '../../controllers/usersController';
import { ComponentProps, RouterLink } from '../../types';
import template from './template.pug';

interface AvatarChangeProps extends ComponentProps {
  backLink: Link;
  profileLink: Link;
  userSettingsForm: UserSettingsForm;
  avatarForm: AvatarForm;
}

class AvatarChange extends Component {
  readonly props: AvatarChangeProps;

  constructor() {
    const userSettingsForm = new UserSettingsForm({});

    const backLink = new Link({
      label: '<',
      go: RouterLink.Back,
      className: 'back-button',
    });

    const avatarForm = new AvatarForm({});

    super('div', {
      hasFlow: true,
      userSettingsForm,
      avatarForm,
      backLink,
    });
  }

  async componentDidMount(): Promise<void> {
    this.addEventListener('submit', AvatarChange.handleSubmit);

    await AuthController.checkAuthorization();
  }

  static async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await UsersController.changeAvatar(e);
  }

  render(): string {
    const { user } = this.props;

    if (!user) {
      return '';
    }

    return template({
      backLink: this.props.backLink,
      userSettingsForm: this.props.userSettingsForm.setProps({ user }),
      avatarForm: this.props.avatarForm,
    });
  }
}

export default AvatarChange;
