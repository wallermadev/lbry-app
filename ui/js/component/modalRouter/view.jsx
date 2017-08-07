import React from "react";
import ModalError from "component/modalError";
import ModalAuthFailure from "component/modalAuthFailure";
import ModalDownloading from "component/modalDownloading";
import ModalInsufficientCredits from "component/modalInsufficientCredits";
import ModalUpgrade from "component/modalUpgrade";
import ModalWelcome from "component/modalWelcome";
import ModalFirstReward from "component/modalFirstReward";
import * as modals from "constants/modal_types";

class App extends React.PureComponent {
  componentWillMount() {
    this.showWelcome(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.showWelcome(nextProps);
  }

  showWelcome(props) {
    const { isWelcomeAcknowledged, openWelcomeModal, user } = props;

    if (
      !isWelcomeAcknowledged &&
      user &&
      !user.is_reward_approved &&
      !user.is_identity_verified
    ) {
      openWelcomeModal();
    }
  }

  render() {
    const { modal } = this.props;
    switch (modal) {
      case modals.UPGRADE:
        return <ModalUpgrade />;
      case modals.DOWNLOADING:
        return <ModalDownloading />;
      case modals.ERROR:
        return <ModalError />;
      case modals.INSUFFICIENT_CREDITS:
        return <ModalInsufficientCredits />;
      case modals.WELCOME:
        return <ModalWelcome />;
      case modals.FIRST_REWARD:
        return <ModalFirstReward />;
      case modals.AUTHENTICATION_FAILURE:
        return <ModalAuthFailure />;
      case modals.TRANSACTION_FAILED:
        return <ModalTransactionFailed />;
      case modals.INSUFFICIENT_BALANCE:
        return <ModalInsufficientBalance />;
    }
  }
}

export default ModalRouter;
