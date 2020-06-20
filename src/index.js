/** @format */

import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import * as serviceWorker from "./serviceWorker";
import "fontsource-roboto";

import Router from "./Router";

const client = new ApolloClient({
  uri: process.env.REACT_APP_WORKSPACE_ENDPOINT + process.env.REACT_APP_AUTH_PROFILE_ID,
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router />
	</ApolloProvider>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
