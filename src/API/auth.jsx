/** @format */
import { gql } from "apollo-boost";
import { request, GraphQLClient } from "graphql-request";

async function loginAPI(query) {
	const LOGIN_QUERY = gql`
		mutation UserLogin($email: String!, $password: String!) {
			userLogin(data: { email: $email, password: $password }) {
				success
				auth {
					idToken
				}
			}
		}
	`;

	const variables = {
		email: query.email,
		password: query.password,
	};

	try {
		let response = await request(
			process.env.REACT_APP_WORKSPACE_ENDPOINT + process.env.REACT_APP_AUTH_PROFILE_ID,
			LOGIN_QUERY,
			variables,
		);
		if (response.userLogin.success) {
			const token = response.userLogin.auth.idToken;

			response = await getUser(query.email, token);
			const dataResponse = { ...response, token };
			return dataResponse;
		}
	} catch (error) {
		console.log(error);
		const auth = "No Authorized";
		return auth;
	}
}

async function getUser(email, token) {
	const graphQLClient = new GraphQLClient(
		process.env.REACT_APP_WORKSPACE_ENDPOINT + process.env.REACT_APP_AUTH_PROFILE_ID,
		{
			headers: {
				authorization: "Bearer " + token,
			},
		},
	);

	const USER_QUERY = gql`
		query User($email: String!) {
			user(email: $email) {
				id
				firstName
				lastName
			}
		}
	`;

	const variables = {
		email: email,
	};

	try {
		const data = await graphQLClient.request(USER_QUERY, variables);
		return data;
	} catch (error) {
		console.log(error);
	}
}

export { loginAPI };
