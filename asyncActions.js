const redux = require("redux");
const axios = require("axios").default;
/*Allows dispatch to receive a function instead of an object
as an argument*/
const thunkMiddleware = require("redux-thunk").default;
const initialState = {
  loading: false,
  user: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUserRequest = () => ({
  type: FETCH_USERS_REQUESTED,
});

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCEEDED,
  payload: users,
});

const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILED,
  payload: error,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchUsers =
  () =>
  /*returns a function instead of an action object, only
  allowed by redux-thunk*/
  async (dispatch) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = response.data.map((user) => user.id);
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };

const store = redux.legacy_createStore(
  reducer,
  redux.applyMiddleware(thunkMiddleware)
);

console.log(store.getState());

const unsuscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
