/** @format */
import {gql} from "apollo-boost";
import axios from "axios";

import config from "../config/secrets";
import createGraphQLClient from '../utils/createGraphQLClient';

const taskList = async (token) => {
  const graphQLClient = createGraphQLClient(token);

  const TASK_LIST_QUERY = gql`
    {
      tasksList {
        items {
          id
          name
          description
          isCompleted
          users {
            email
            firstName
            lastName
          }
          createdAt
          updatedAt
          createdBy {
            email
            firstName
            lastName
          }
        }
      }
    }
  `;

  try {
    return await graphQLClient.request(TASK_LIST_QUERY);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const task = async (token, taskId) => {
  const graphQLClient = createGraphQLClient(token);

  const TASK_QUERY = gql`
    query Task($taskId: ID!) {
      task(id: $taskId) {
        id
        name
        description
        isCompleted
        users {
          email
          firstName
          lastName
        }
        createdAt
        updatedAt
        createdBy {
          email
          firstName
          lastName
        }
      }
    }
  `;

  const variables = {
    taskId,
  };

  try {
    return await graphQLClient.request(TASK_QUERY, variables);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const taskCreate = async (token, query) => {
  const graphQLClient = createGraphQLClient(token);

  const TASK_CREATE_QUERY = gql`
    mutation TaskCreate($name: String!, $description: String!, $isCompleted: Boolean!, $userEmail: String!) {
      taskCreate(data: {
        name: $name,
        description: $description,
        isCompleted: $isCompleted,
        users: {
          connect: {
            email: $userEmail
          }
        }
      }) {
        id
        name
        description
        isCompleted
        users {
          email
          firstName
          lastName
        }
        createdAt
        updatedAt
        createdBy {
          email
          firstName
          lastName
        }
      }
    }
  `;

  const variables = {...query};

  try {
    return await graphQLClient.request(TASK_CREATE_QUERY, variables);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const taskUpdate = async (token, taskId, query) => {
  const graphQLClient = createGraphQLClient(token);

  const TASK_UPDATE_QUERY = gql`
    mutation TaskUpdate($taskId: ID!, $name: String!, $description: String!, $isCompleted: Boolean!, $userEmail: String!) {
      taskUpdate(data: {
        id: $taskId,
        name: $name,
        description: $description,
        isCompleted: $isCompleted,
        users: {
          connect: {
            email: $userEmail
          }
        }
      }) {
        id
        name
        description
        isCompleted
        users {
          email
          firstName
          lastName
        }
        createdAt
        updatedAt
        createdBy {
          email
          firstName
          lastName
        }
      }
    }
  `;

  const variables = {taskId, ...query};

  try {
    return await graphQLClient.request(TASK_UPDATE_QUERY, variables);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const taskIsCompleted = async (token, taskId) => {
  try {
    let response = await axios.put(
      process.env.REACT_APP_WORKSPACE_ENDPOINT + process.env.REACT_APP_AUTH_PROFILE_ID + process.env.REACT_APP_TASK_IS_COMPLETED_WEBHOOK + taskId,
      {},
      {headers: config.headersAuth(token)},
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const taskDelete = async (token, taskId) => {
  const graphQLClient = createGraphQLClient(token);

  const TASK_DELETE_QUERY = gql`
    mutation TaskDelete($taskId: ID!) {
      taskDelete(data: {
        id: $taskId
      }), {
        success
      }
    }
  `;

  const variables = {
    taskId,
  };

  try {
    return await graphQLClient.request(TASK_DELETE_QUERY, variables);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {taskList, task, taskCreate, taskUpdate, taskIsCompleted, taskDelete};
