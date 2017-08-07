import React from "react";
import Link from "component/link";
import FileLink from "component/fileLink";
import ModalRemoveFile from "component/modalRemoveFile";
import * as modals from "constants/modal_types";

class FileActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      forceShowActions: false,
      showTipBox: false,
    };
  }

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

  onShowFileActionsRowClicked() {
    this.setState({
      forceShowActions: true,
    });
  }

  onAffirmPurchase() {
    this.props.closeModal();
    this.props.loadVideo(this.props.uri);
  }

  handleTipShow() {
    this.setState({
      showTipBox: true,
    });
  }

  handleTipHide() {
    this.setState({
      showTipBox: false,
    });
  }

  onSupportClaimClicked(event) {
    if (this.state.showSupportClaimForm) {
      return;
    }

    let button;
    let parentCard;
    if ("a" === event.target.tagName.toLowerCase()) {
      button = event.target;
    }

    let parent = event.target.parentElement;
    do {
      if (!button && "a" === parent.tagName.toLowerCase()) {
        button = parent;
      }

      if ("card" === parent.className.trim()) {
        parentCard = parent;
      }
      parent = parent.parentElement;
    } while (parent && !parentCard);

    this.setState({
      showSupportClaimForm: true,
      supportClaimLinkOffset: button && parentCard
        ? button.getBoundingClientRect().left -
            parentCard.getBoundingClientRect().left -
            12 /* left pad + icon */
        : 0,
    });
  }

  sendSupportClaim() {
    this.setState({ supportInProgress: true });
    const { claim, setClaimSupport, claimNewSupport } = this.props;
    setClaimSupport(claim.claim_id, claim.name);
    claimNewSupport();
  }

  onClaimSupportSuccessful() {
    this.setState({
      showSupportClaimForm: false,
    });
    this.onClaimSupportCompleted();
  }

  onClaimSupportCompleted() {
    this.props.closeModal();
    this.setState({ supportInProgress: false });
  }

  render() {
    const {
      claimIsMine,
      fileInfo,
      modal,
      onClick,
      platform,
      uri,
      openInFolder,
      openModal,
    } = this.props;

    const metadata = fileInfo ? fileInfo.metadata : null,
      openInFolderMessage = platform.startsWith("Mac")
        ? __("Finder")
        : __("Folder"),
      showDelete = fileInfo && Object.keys(fileInfo).length > 0,
      title = metadata ? metadata.title : uri;

    let items = [];
    return (
      <div onClick={onClick}>
        <FileLink key="fileLink" uri={uri} />
        <Link
          label={__("Support")}
          button="text"
          icon="icon-gift"
          onClick={this.onSupportClaimClicked.bind(this)}
        />
        {fileInfo &&
          fileInfo.download_path &&
          <Link
            button="text"
            icon="icon-folder-o"
            onClick={() => openInFolder(fileInfo)}
            label={openInFolderMessage}
          />}
        {showDelete &&
          <Link
            button="text-alt file-actions__delete-button"
            icon="icon-trash"
            onClick={() =>
              openModal(modals.CONFIRM_FILE_REMOVE, {
                uri,
                title,
                outpoint: fileInfo.outpoint,
              })}
            label={__("Remove")}
          />}
        {modal == modals.CONFIRM_FILE_REMOVE &&
          <ModalRemoveFile
            uri={uri}
            outpoint={fileInfo.outpoint}
            title={title}
          />}
      </div>
    );
    /*
    return (
      <section className="file-actions">
        {showTipBox ? "" : content}
        <TipLink
          onTipShow={this.handleTipShow.bind(this)}
          onTipHide={this.handleTipHide.bind(this)}
          showTipBox={showTipBox}
          address={claimInfo.address}
        />

        {this.state.showSupportClaimForm &&
          <div
            className="file-actions__support_claim"
            style={{ marginLeft: this.state.supportClaimLinkOffset + "px" }}
          >
            <form onSubmit={this.sendSupportClaim.bind(this)}>
              <FormField
                type="number"
                min="0.01"
                placeholder="0.01"
                step="0.01"
                postfix="LBC"
                className="form-field__input--inline"
                onChange={setAmount}
              />
              <div className="file-actions__inline-buttons">
                <Link
                  button="primary"
                  label={__("Confirm")}
                  onClick={this.sendSupportClaim.bind(this)}
                  disabled={
                    !(parseFloat(amount) > 0.0) || this.state.supportInProgress
                  }
                />
                <Link
                  button="cancel"
                  label={__("Cancel")}
                  onClick={() => this.setState({ showSupportClaimForm: false })}
                />
              </div>
            </form>
          </div>}
      </section>*/
  }
}

export default FileActions;
