import React from "react";
import { Modal } from "modal/modal";
import { FormRow } from "component/form";
import FormField from "component/formField";

class ModalAddBookmarkList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      bookmarkList: "favorites",
    };
  }

  handleBookmarkListChange(event) {
    this.setState({
      bookmarkList: event.target.value,
    });
  }

  render() {
    const { closeModal, bookmarkLists, addBookmarks, uri } = this.props;
    const { bookmarkList } = this.state;

    return (
      <Modal
        isOpen={true}
        type="confirm"
        contentLabel={__("Confirm File Remove")}
        confirmButtonLabel={__("Add")}
        onConfirmed={() => addBookmark(uri, bookmarkList)}
        onAborted={closeModal}
      >
        <section>
          <label>
            {__("Add to Bookmarks:")} {" "}
            <FormField
              ref="list"
              type="select"
              name="Bookmark list name"
              value={bookmarkList}
              name="list"
              onChange={this.handleBookmarkListChange.bind(this)}
            >
              {bookmarkLists.map(list =>
                <option key={list} value={list}>{__(list)}</option>
              )}
            </FormField>
          </label>
        </section>
      </Modal>
    );
  }
}

export default ModalAddBookmarkList;
