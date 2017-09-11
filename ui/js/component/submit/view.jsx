import React from "react";
import { Icon } from "component/common.js";

const Submit = props => {
  const { title, label, icon, disabled } = props;

  const className =
    "button-block" +
    " button-primary" +
    " button-set-item" +
    " button-submit" +
    (disabled ? " disabled" : "");

  const content = (
    <span className="button__content">
      {"icon" in props ? <Icon icon={icon} fixed={true} /> : null}
      {label ? <span className="link-label">{label}</span> : null}
    </span>
  );

  return (
    <button type="submit" className={className} title={title}>
      {content}
    </button>
  );
};

export default Submit;
