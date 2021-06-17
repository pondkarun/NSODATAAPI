export const SET_KEY_CLOAK = (data) => {
    return (dispatch) => dispatch({
        type: "SET_KEYCLOAK",
        payload: data
    })

}