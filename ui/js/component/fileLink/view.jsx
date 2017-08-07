import React from "react";
import { Icon, BusyMessage } from "component/common";
import FilePrice from "component/filePrice";
import { Modal } from "component/modal";
import Link from "component/link";
import * as modals from "constants/modal_types";

class FileLink extends React.PureComponent {
  componentWillMount() {
    this.checkAvailability(this.props.uri);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAvailability(nextProps.uri);
    this.restartDownload(nextProps);
  }

  restartDownload(props) {
    const { downloading, fileInfo, uri, restartDownload } = props;

    if (
      !downloading &&
      fileInfo &&
      !fileInfo.completed &&
      fileInfo.written_bytes !== false &&
      fileInfo.written_bytes < fileInfo.total_bytes
    ) {
      restartDownload(uri, fileInfo.outpoint);
    }
  }

  checkAvailability(uri) {
    if (!this._uri || uri !== this._uri) {
      this._uri = uri;
      this.props.checkAvailability(uri);
    }
  }

  onAffirmPurchase() {
    this.props.closeModal();
    this.props.loadVideo(this.props.uri);
  }

  render() {
    const {
      fileInfo,
      downloading,
      uri,
      openInShell,
      modal,
      closeModal,
      startDownload,
      costInfo,
      loading,
    } = this.props;

    const metadata = fileInfo ? fileInfo.metadata : null,
      title = metadata ? metadata.title : uri;

    let content;

    if (loading || downloading) {
      const progress = fileInfo && fileInfo.written_bytes
        ? fileInfo.written_bytes / fileInfo.total_bytes * 100
        : 0,
        label = fileInfo
          ? progress.toFixed(0) + __("% complete")
          : __("Connecting..."),
        labelWithIcon = (
          <span className="button__content">
            <Icon icon="icon-download" />
            <span>
              {label}
            </span>
          </span>
        );

      content = (
        <div className="faux-button-block file-actions__download-status-bar button-set-item">
          <div
            className="faux-button-block file-actions__download-status-bar-overlay"
            style={{ width: progress + "%" }}
          >
            {labelWithIcon}
          </div>
          {labelWithIcon}
        </div>
      );
    } else if (fileInfo === null && !downloading) {
      if (!costInfo) {
        content = <BusyMessage message={__("Fetching cost info")} />;
      } else {
        content = (
          <Link
            button="text"
            label={__("Download")}
            icon="icon-download"
            onClick={() => {
              startDownload(uri);
            }}
          />
        );
      }
    } else if (fileInfo && fileInfo.download_path) {
      content = (
        <Link
          label={__("Open")}
          button="text"
          icon="icon-external-link-square"
          onClick={() => openInShell(fileInfo)}
        />
      );
    } else {
      return null;
    }
    let a = (
      <div>
        <Modal
          type="confirm"
          isOpen={modal == modals.CONFIRM_FILE_PURCHASE}
          contentLabel={__("Confirm Purchase")}
          onConfirmed={this.onAffirmPurchase.bind(this)}
          onAborted={closeModal}
        >
          {__("This will purchase")} <strong>{title}</strong> {__("for")}{" "}
          <strong>
            <FilePrice uri={uri} look="plain" />
          </strong>{" "}
          {__("credits")}.
        </Modal>
        <Modal
          isOpen={modal == "timedOut"}
          contentLabel={__("Download failed")}
          onConfirmed={closeModal}
        >
          {__("LBRY was unable to download the stream")} <strong>{uri}</strong>.
        </Modal>
      </div>
    );

    return content;
  }
}

export default FileLink;
