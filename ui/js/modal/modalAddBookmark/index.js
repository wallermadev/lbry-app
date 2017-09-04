import React from "react";
import { connect } from "react-redux";
import { doCloseModal, doAddBookmark } from "actions/app";
import { doDeleteFileAndGoBack } from "actions/file_info";
import { selectCurrentModal, selectBookmarkLists } from "selectors/app";
import { makeSelectClaimForUriIsMine } from "selectors/claims";

import ModalAddBookmark from "./view";

const select = (state, props) => ({
  bookmarkLists: selectBookmarkLists(state, props),
});

const perform = dispatch => ({
  closeModal: () => dispatch(doCloseModal()),
  addBookmark: (uri, list) => dispatch(doAddBookmark(uri, list)),
});

export default connect(select, perform)(ModalAddBookmark);
