import React from "react";
import { Route } from "react-router-dom";

import FullPageLayout from "../fullPageLayout";

const FullPageLayoutRoute = ({ render, ...rest }) => {
  return (
    <Route
        {...rest}
        render={matchProps => (
          <FullPageLayout>
              {render(matchProps)}
          </FullPageLayout>
        )}
    />
  );
};

export default FullPageLayoutRoute;