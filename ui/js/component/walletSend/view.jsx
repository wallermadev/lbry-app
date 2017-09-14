import React from "react";
import Modal from "modal/modal";
import { Form, FormRow, Submit } from "component/form";
import lbryuri from "lbryuri";

class WalletSend extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    const { amount, address, sendToAddress } = this.props;
    const validSubmit = parseFloat(amount) > 0.0 && address;

    if (validSubmit) {
      sendToAddress();
    }
  }

  render() {
    const {
      closeModal,
      modal,
      setAmount,
      setAddress,
      amount,
      address,
      error,
    } = this.props;

    return (
      <section className="card">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <div className="card__title-primary">
            <h3>{__("Send Credits")}</h3>
          </div>
          <div className="card__content">
            <FormRow
              label={__("Amount")}
              postfix={__("LBC")}
              step="0.01"
              min="0"
              type="number"
              placeholder="1.23"
              size="10"
              onChange={setAmount}
              value={amount}
            />
          </div>
          <div className="card__content">
            <FormRow
              label={__("Recipient Address")}
              placeholder="bbFxRyXXXXXXXXXXXZD8nE7XTLUxYnddTs"
              type="text"
              size="60"
              onChange={setAddress}
              value={address}
              regexp={lbryuri.REGEXP_ADDRESS}
              trim={true}
            />
            <div className="form-row-submit">
              <Submit
                label={__("Send")}
                disabled={!(parseFloat(amount) > 0.0) || !address}
              />
            </div>
          </div>
        </Form>
        {modal == "insufficientBalance" &&
          <Modal
            isOpen={true}
            contentLabel={__("Insufficient balance")}
            onConfirmed={closeModal}
          >
            {__(
              "Insufficient balance: after this transaction you would have less than 1 LBC in your wallet."
            )}
          </Modal>}
        {modal == "transactionSuccessful" &&
          <Modal
            isOpen={true}
            contentLabel={__("Transaction successful")}
            onConfirmed={closeModal}
          >
            {__("Your transaction was successfully placed in the queue.")}
          </Modal>}
        {modal == "transactionFailed" &&
          <Modal
            isOpen={true}
            contentLabel={__("Transaction failed")}
            onConfirmed={closeModal}
          >
            {error}
          </Modal>}
      </section>
    );
  }
}

export default WalletSend;
