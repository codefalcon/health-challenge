import callApi from '../../util/apiCaller';

// Export Constants
export const GOT_LOANS = 'GOT_LOANS';

// Export Actions
export function gotData(data) {
  return {
    type: GOT_LOANS,
    data,
  };
}

export function fetchData(pagenum) {
  const apiPath = `/loansdb/${pagenum}`;
  return (dispatch) => {
    return callApi(apiPath).then(res => dispatch(gotData(res)));
  };
}

