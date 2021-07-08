export const SET_DATALIST = (data) => {
    return (dispatch) => dispatch({
        type: "SETDATALIST",
        payload: data
    })
}