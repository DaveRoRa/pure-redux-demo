const redux = require("redux");
//logger works like a console log with the previous and future state
const logger = require("redux-logger").createLogger();
const SHOES_ORDERED = "SHOES_ORDERED";
const SHOES_RESTOCKED = "SHOES_RESTOCKED";
const PURSE_ORDERED = "PURSE_ORDERED";
const PURSE_RESTOCKED = "PURSE_RESTOCKED";

function orderShoes() {
  return { type: SHOES_ORDERED, payload: 1 };
}

function restockShoes(qty = 1) {
  return {
    type: SHOES_RESTOCKED,
    payload: qty,
  };
}

function orderPurse(qty = 1) {
  return { type: PURSE_ORDERED, payload: qty };
}

function restockPurse(qty = 1) {
  return {
    type: PURSE_RESTOCKED,
    payload: qty,
  };
}

const initialState = {
  numOfShoes: 10,
  numOfPurses: 20,
};

const initialShoe = {
  numOfShoes: 10,
};

const initialPurse = {
  numOfPurses: 20,
};

const shoeReducer = (state = initialShoe, action) => {
  switch (action.type) {
    case SHOES_ORDERED:
      return {
        ...state,
        numOfShoes: state.numOfShoes - 1,
      };
    case SHOES_RESTOCKED:
      return {
        ...state,
        numOfShoes: state.numOfShoes + action.payload,
      };
    default:
      return state;
  }
};

const purseReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURSE_ORDERED:
      return {
        ...state,
        numOfPurses: state.numOfPurses - action.payload,
      };
    case PURSE_RESTOCKED:
      return {
        ...state,
        numOfPurses: state.numOfPurses + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  shoes: shoeReducer,
  purse: purseReducer,
});

const store = redux.legacy_createStore(
  rootReducer,
  /*The second argument is for applying middlewares,
  the function has to be passed as an argumnt
   to redux.applyMiddleware()*/
  redux.applyMiddleware(logger)
);

store.dispatch(orderShoes());
store.dispatch(orderShoes());
store.dispatch(orderShoes());
store.dispatch(restockShoes(4));

const actions = redux.bindActionCreators(
  {
    orderShoe: orderShoes,
    restockShoe: restockShoes,
    orderPurse,
    restockPurse,
  },
  store.dispatch
);

actions.orderShoe();
actions.orderShoe();
actions.orderShoe();
actions.restockShoe(3);

actions.orderPurse();
actions.restockPurse(3);
