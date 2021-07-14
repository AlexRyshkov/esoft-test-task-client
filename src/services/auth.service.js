import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/api/auth/`;

class AuthService {
  login(login, password) {
    return axios
      .post(API_URL + "signin", { login, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  async isAuthorized() {
    try {
      await axios.get(API_URL, { headers: authHeader() });
      return true;
    }
    catch (error) {
      return false;
    }
  }
}

export default new AuthService();
