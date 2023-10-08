const Storage = {
  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },
  getToken:()=>{
    return localStorage.getItem('token')
  }
};
export default Storage