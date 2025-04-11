import axios from "axios";

const url = "https://api.github.com/search";
// const users = "users?q=location:uzbekistan";

export async function getSome(givenUrl, keyword){
  try{
    const repos = `repositories?q=${keyword == '' ? 'uzbek' : keyword}&sort=stars`;
    const reqUrl = givenUrl ?? `${url}/${repos}`;

    const res = await axios.get(reqUrl);

    if(res && res.data){
      return { data: res.data, link: res.headers.link };
    }
  } catch(err){
    console.error(err);
  }
}