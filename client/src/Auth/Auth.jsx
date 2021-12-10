import Cookies from "js-cookie";

class Authentication {
  isLoggedIn;
  username;
  constructor() {
    let data = Cookies.get("mobile");
    if (data) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  setLogIn(mobile) {
    //this.username = username;
    Cookies.set("mobile", mobile, { expires: 30 });
    this.isLoggedIn = true;
  }
  getLogin() {
    return this.isLoggedIn;
  }
  getUserName() {
    return this.username;
  }
  logOut() {
    Cookies.remove("mobile");
    this.isLoggedIn = false;
    window.location.href = "/";
  }
}
let auth1 = new Authentication();
export { auth1 };
