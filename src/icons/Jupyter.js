import React from "react";

const SVG = ({
  style = {
    marginTop: `5px`,
    marginRight: `5px`,
    fill: `#e56426`
  },
  width = `20px`,
  className = ``,
  role = `img`,
  viewBox = `0 0 24 24`
}) => (
  <svg
    className={`svg-icon ${className || ``}`}
    height={width}
    role={role}
    style={style}
    viewBox={viewBox}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M12.2 18.1c-3.8 0-7.2-1.4-9-3.4.7 1.8 1.9 3.4 3.5 4.5s3.5 1.7 5.5 1.7 3.9-.6 5.5-1.7 2.8-2.7 3.5-4.5c-1.8 2-5.2 3.4-9 3.4zM12.2 4.9c3.8 0 7.2 1.4 9 3.4-.7-1.8-1.9-3.4-3.5-4.5C16 2.6 14.1 2 12.2 2c-2 0-3.9.6-5.5 1.7-1.6 1.2-2.8 2.7-3.5 4.6 1.8-2.1 5.1-3.4 9-3.4zM19.2.10000000000000009A1.4 1.4 0 1 0 19.2 2.9 1.4 1.4 0 1 0 19.2.10000000000000009zM5.1 20.3A1.8 1.8 0 1 0 5.1 23.900000000000002 1.8 1.8 0 1 0 5.1 20.3zM3.6 2.3A1 1 0 1 0 3.6 4.3 1 1 0 1 0 3.6 2.3z"/>
  </svg>
);

export default SVG;
