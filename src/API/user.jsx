import {gql} from "apollo-boost";
import createGraphQLClient from "../utils/createGraphQLClient";

const userListWithoutAdmins = async (token) => {
  const graphQLClient = createGraphQLClient(token);

  const USER_LIST_QUERY = gql`
		{
			usersList(filter: {
				roles: {
					none: {
						name: {
							equals: "Administrator"
						}
					}
				}
			}) {
				items {
					id
					email
					firstName
					lastName
				}
			}
		}
  `;

  try {
    return await graphQLClient.request(USER_LIST_QUERY);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {userListWithoutAdmins};
