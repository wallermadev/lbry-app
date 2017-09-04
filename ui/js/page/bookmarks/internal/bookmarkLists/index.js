import React from "react";
import { connect } from "react-redux";
import { doCloseModal, doOpenModal } from "actions/app";
import {
  selectBookmarkLists,
  selectCurrentBookmarkList,
  selectCurrentModal,
} from "selectors/app";
import { doNavigate } from "actions/navigation";
import BookmarkLists from "./view";

const select = (state, props) => ({
  modal: selectCurrentModal(state),
  bookmarkLists: selectBookmarkLists(state),
});

const perform = dispatch => ({
  openModal: modal => dispatch(doOpenModal(modal)),
  navigate: (path, params) => dispatch(doNavigate(path, params)),
});

export default connect(select, perform)(BookmarkLists);
