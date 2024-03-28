import React from 'react';

const Layout = ({ children }) => (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Meetings</title>
      <link rel="stylesheet" href="./style.css" />
      <link rel="icon" href="./" type="image/x-icon" />
      <main style={mainStyle}>{children}</main>
    </div>
);

const mainStyle = {
    display: "flex",
    justifyContent: "center",
};

export default Layout;