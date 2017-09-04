import React from "react";
import { Modal } from "modal/modal";
import { FormRow } from "component/form";
import FormField from "component/formField";

class ModalAddBookmarkList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  handleNameChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { closeModal, addBookmarkList } = this.props;
    const { value } = this.state;

    return (
      <Modal
        isOpen={true}
        type="confirm"
        contentLabel={__("Confirm File Remove")}
        confirmButtonLabel={__("Add")}
        onConfirmed={() => addBookmarkList(value)}
        onAborted={closeModal}
      >
        <p>
          {__("Add a new list:")} {" "}
        </p>

        <section>
          <label>
            <FormField
              ref="lists_name"
              label={__("Name")}
              type="text"
              name="Bookmark list name"
              placeholder="My list name"
              value={value}
              onChange={this.handleNameChange.bind(this)}
            />
          </label>
        </section>
      </Modal>
    );
  }
}

export default ModalAddBookmarkList;
