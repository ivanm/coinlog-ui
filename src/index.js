import React from "react";
import ReactDOM from "react-dom";

const Index = () =>
<div className="container">
    <div className="left-pane">
        <div className="nav-title">
            coinlog<span className="title-dot">.</span>sh
        </div>
    </div>
    <div class="main-pane">
    </div>
</div>;

ReactDOM.render(<Index />, document.getElementById("app"));
