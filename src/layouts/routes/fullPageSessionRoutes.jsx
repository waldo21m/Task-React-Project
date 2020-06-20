/** @format */

import React from "react";
import { Route, Redirect } from "react-router-dom";

import FullPageLayout from "../fullPageLayout";

const FullPageLayoutSessionRoute = ({ render, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(matchProps) => {
				if (localStorage.getItem("token")) {
					return (
						<Redirect
							to={{
								pathname: "/",
							}}
						/>
					);
				} else {
					return <FullPageLayout>{render(matchProps)}</FullPageLayout>;
				}
			}}
		/>
	);
};

export default FullPageLayoutSessionRoute;
