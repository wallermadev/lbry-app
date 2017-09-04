import React from "react";
import { connect } from "react-redux";
import { doCloseModal, doAddBookmarkList } from "actions/app";
import { doDeleteFileAndGoBack } from "actions/file_info";
import { selectCurrentModal } from "selectors/app";
import { makeSelectClaimForUriIsMine } from "selectors/claims";

import ModalAddBookmarkList from "./view";

const makeSelect = () => {
  const select = (state, props) => ({});

  return select;
};

const perform = dispatch => ({
  closeModal: () => dispatch(doCloseModal()),
  addBookmarkList: list => dispatch(doAddBookmarkList(list)),
});

export default connect(makeSelect, perform)(ModalAddBookmarkList);
