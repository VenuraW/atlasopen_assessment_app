import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire";
import firebaseConfig from "./firebaseConfig";
import App from "./components/App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
	<FirebaseAppProvider firebaseConfig={firebaseConfig}>
		<Suspense fallback={<h3>Loading...</h3>}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Suspense>
	</FirebaseAppProvider>,
	document.getElementById("root")
);
