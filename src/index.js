import React from "react";
import ReactDOM from "react-dom";

const Index = () =>
  <div>
    <a className="pure-button" onClick={ () => alert('hi') }>Hello World</a>
  </div>;

ReactDOM.render(<Index />, document.getElementById("app"));
