export const FETCH_SITTERS = "FETCH_SITTERS";

function fetchSitters(): object {
  return {
    type: FETCH_SITTERS,
  };
}

function dispatchFetchSitters() {
  return (dispatch) => {
    dispatch(fetchSitters());
  };
}
