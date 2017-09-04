import React from "react";
import Link from "component/link";
import ModalAddBookmarkList from "modal/modalAddBookmarkList";
import * as modals from "constants/modal_types";

class BookmarkLists extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      bookmarkLists,
      currentList,
      navigate,
      modifier,
      modal,
    } = this.props;

    const lists = bookmarkLists.map((title, index) => {
      return (
        <Link
          onClick={event => navigate(`/bookmarks`, { list: title })}
          key={index}
          className={
            currentList === title || (!currentList && title === "favorites")
              ? "sub-header-selected"
              : "sub-header-unselected"
          }
        >
          {title}
        </Link>
      );
    });

    return (
      <nav
        className={"sub-header" + (modifier ? " sub-header--" + modifier : "")}
      >
        {lists}

        <Link
          onClick={event => openModal(modals.CONFIRM_BOOKMARK_LIST_ADD)}
          disabled={false}
          button="alt button--flat"
          icon="icon-plus-circle"
          label={__("Add List")}
        />
        {modal === modals.CONFIRM_BOOKMARK_LIST_ADD && <ModalAddBookmarkList />}
      </nav>
    );
  }
}

export default BookmarkLists;
