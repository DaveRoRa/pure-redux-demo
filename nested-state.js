const redux = require("redux");
/*Immer allows to modify properties inside an object
and return the new object without modifying the
original one */
const produce = require("immer").produce;

const initialState = {
  name: "David",
  address: {
    street: "Calle 12",
    city: "Boston",
    state: "Matanzas",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //Immer applied
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = redux.legacy_createStore(stateReducer);

console.log("Initial State", store.getState());

const unsuscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

store.dispatch(updateStreet("Calle Vía Rápida"));

unsuscribe();
