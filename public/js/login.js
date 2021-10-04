/* eslint-disable */

export const login = async (email, password) => {
  try {
    //  console.log(email,password);
    const res = await axios({
      // gửi http method đến server
      method: "POST",
      url: "/api/v1/login",
      data: {
        email,
        password,
      },
    });
    // console.log(res);
    if (res) {
      // showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        // nếu thành công quay về trang chủ
        location.assign("/");
      }, 1500);
    }
  } catch (error) {
    showAlert("error", "sai mk or email");
  }
};
export const logout = async () => {
  try {
    // console.log("ok");
    const res = await axios({
      //  nếu thành công quay về trang chủ
      method: "GET",
      url: "/api/v1/logout",
    });
    //console.log("db");
    if (res.data.status === "success") {
      location.reload(true); // reload lại trang
      //console.log("okkkkkkkkkkkkkkkkkkkkkkk");
    }
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
};
