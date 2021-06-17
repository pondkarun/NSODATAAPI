import API from '../util/Api';

export const GetAPIkeyCloak = async () => {
  let gettoken = JSON.parse(localStorage.getItem('KEYCLOAK'));
  let succesdata;
  console.log('gettoken :>> ', gettoken);
  let checktokentime = new Date(gettoken.time_stamps.date).getTime() > new Date(new Date().getTime() + gettoken.expires_in * 1000).getTime()
  console.log('checktokentime :>> ', checktokentime);
  if (checktokentime) {
    var formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("client_id", "IvbIEAOufH6b5xQQpJlulVPGGHMBUeeq");
    formData.append("client_secret", "b5e098c2-44b4-4cc4-a845-c3058de37add");
    formData.append("username", "directory_service");
    formData.append("password", "4Dm!n2021pdwd03");

    await API.post('/services/v1/api/keycloak', formData).then(({ data: { data } }) => {
      // console.log('items :>> ', data);
      //   dispatch(SET_KEY_CLOAK(data));
      localStorage.setItem('KEYCLOAK', JSON.stringify(data));
      succesdata = data;

    }).catch((error) => {
      console.log(`error`, error);
    })
  } else {
    succesdata = gettoken;
  }

  return succesdata;
}