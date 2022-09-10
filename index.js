const redux = require("redux");

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";
const ICE_CREAM_RESTOCKED = "ICE_CREAM_RESTOCKED";

/*Functions to return actions, it's better to use a function
instead of just dispatching an action object directly so any
change in the action structure just can be done in one place
and to avoid typing errors*/
function orderCake() {
  return { type: CAKE_ORDERED, payload: 1 };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return { type: ICE_CREAM_ORDERED, payload: qty };
}

function restockIceCream(qty = 1) {
  return {
    type: ICE_CREAM_RESTOCKED,
    payload: qty,
  };
}

const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

const initialCake = {
  numOfCakes: 10,
};

const initialIceCream = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCake, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      /*It has to return the state, not change it directly*/
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case ICE_CREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = redux.legacy_createStore(rootReducer);

console.log("Initial State", store.getState());

/*Execute callback function everytime a dispatch is triggered
and return a function to unsubscribe, when executed the callback
is not called anymore*/
const unsuscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(4));

//Bind actions to an object, not necessary
const actions = redux.bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

actions.orderIceCream();
actions.restockIceCream(3);

unsuscribe();
