import React from "react";
import { connect } from "react-redux";
import {
  makeSelectFileInfoForUri,
  makeSelectDownloadingForUri,
  makeSelectLoadingForUri,
} from "selectors/file_info";
import { selectCurrentModal } from "selectors/app";
import { makeSelectCostInfoForUri } from "selectors/cost_info";
import { doCloseModal } from "actions/app";
import { doFetchAvailability } from "actions/availability";
import { doOpenFileInShell } from "actions/file_info";
import { doPurchaseUri, doLoadVideo, doStartDownload } from "actions/content";
import FileLink from "./view";
import * as modals from "constants/modal_types";

const makeSelect = () => {
  const selectFileInfoForUri = makeSelectFileInfoForUri();
  const selectDownloadingForUri = makeSelectDownloadingForUri();
  const selectCostInfoForUri = makeSelectCostInfoForUri();
  const selectLoadingForUri = makeSelectLoadingForUri();

  const select = (state, props) => ({
    fileInfo: selectFileInfoForUri(state, props),
    /*availability check is disabled due to poor performance, TBD if it dies forever or requires daemon fix*/
    modal: selectCurrentModal(state),
    downloading: selectDownloadingForUri(state, props),
    costInfo: selectCostInfoForUri(state, props),
    loading: selectLoadingForUri(state, props),
  });

  return select;
};

const perform = dispatch => ({
  checkAvailability: uri => dispatch(doFetchAvailability(uri)),
  closeModal: () => dispatch(doCloseModal()),
  openInShell: fileInfo => dispatch(doOpenFileInShell(fileInfo)),
  startDownload: uri =>
    dispatch(doPurchaseUri(uri, modals.CONFIRM_FILE_PURCHASE)),
  loadVideo: uri => dispatch(doLoadVideo(uri)),
  restartDownload: (uri, outpoint) => dispatch(doStartDownload(uri, outpoint)),
});

export default connect(makeSelect, perform)(FileLink);
