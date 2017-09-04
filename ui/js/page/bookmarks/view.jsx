import React from "react";
import Link from "component/link";
import FileTile from "component/fileTile";
import { BusyMessage, Thumbnail } from "component/common.js";

import BookmarkLists from "./internal/bookmarkLists";
import lbryio from "lbryio";

class Bookmarks extends React.PureComponent {
  componentWillMount() {}

  componentWillUnmount() {
    //this.props.cancelResolvingUris();
  }

  render() {
    const { bookmarks, navigate, params } = this.props;

    const listName = params.list || "favorites";

    const bookmarkList = bookmarks.find(list => list.title === listName);

    const claims = bookmarkList ? bookmarkList.bookmarks : undefined;

    let content = (
      <span>
        {__("You haven't added anything to this list yet.")}
        <br />
        {__("Go ")}
        <Link
          onClick={() => navigate("/discover")}
          label={__("search for your first download")}
        />!
      </span>
    );

    if (claims && claims.length > 0) {
      content = claims.map(uri => <FileTile key={uri} uri={uri} />);
    }

    return (
      <main className="main--single-column">
        <BookmarkLists currentList={listName} />
        {content}
      </main>
    );
  }
}

export default Bookmarks;
