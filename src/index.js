import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
	<Suspense fallback={<h3>Loading...</h3>}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Suspense>,
	document.getElementById("root")
);
