import React from "react";
import { connect } from "react-redux";
import { selectBookmarks, makeSelectCurrentBookmarList } from "selectors/app";
import { doNavigate } from "actions/navigation";
import Bookmarks from "./view";

const makeSelect = () => {
  const selectCurrentBookmarkList = makeSelectCurrentBookmarList();

  const select = (state, props) => ({
    currentBookmarkList: selectCurrentBookmarkList(state, props),
    bookmarks: selectBookmarks(state, props),
  });
  return select;
};

const perform = dispatch => ({
  navigate: path => dispatch(doNavigate(path)),
});

export default connect(makeSelect, perform)(Bookmarks);
