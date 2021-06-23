import React, { useState } from "react";

const FloatLabel = props => {
  const [focus, setFocus] = useState(false);
  const { children, label, value } = props;

  const labelClass = focus || value ? "label label-float" : "label";

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>

      <style jsx global>
        {
          `
          .float-label {
              position: relative;
              margin-bottom: 12px;
          }

          .label {
              font-size: 12px;
              font-weight: normal;
              position: absolute;
              pointer-events: none;
              left: 12px;
              top: 12px;
              transition: 0.2s ease all;
          }

          .label-float {
              top: 6px;
              font-size: 10px;
          }

          .example {
              margin: 12px;
          }



          .ant-input {
              padding: 16px 12px 4px 11px;
          }

          .ant-select .ant-select-selector {
              padding: 16px 10px 4px 11px;
          }

          .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
              padding: 16px 10px 4px 11px;
              height: 48px;
          }

          .ant-select-single .ant-select-selector .ant-select-selection-search {
              top: 16px;
          }
          `
        }
      </style>
    </div>
  );
};

export default FloatLabel;