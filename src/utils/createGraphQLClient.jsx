import {GraphQLClient} from "graphql-request";

export default (token) => {
  return new GraphQLClient(
    process.env.REACT_APP_WORKSPACE_ENDPOINT + process.env.REACT_APP_AUTH_PROFILE_ID,
    {
      headers: {
        authorization: token,
      },
    }
  );
};
