import axios from "axios";
import API_ROUTES from "../../../constants/apiRoutes";

const API = {
  get: async () => {
    const { data } = await axios.get(API_ROUTES.USERS.USER);
    return data;
  },
};
export default API;
