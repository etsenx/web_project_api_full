class Auth {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  register(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res;
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        if (err.status === 400) {
          Promise.reject("Salah satu column tidak benar")
        }
      });
  }

  authorize(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res;
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  getUserData(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((err) => {
        if (err.status === 400) {
          return Promise.reject("Token tidak diberikan atau format salah");
        } else if (err.status === 401) {
          return Promise.reject("Token tidak valid");
        } else {
          return Promise.reject(err);
        }
      });
  }
}

export const auth = new Auth({
  baseUrl: "http://api.around.trunk.so",
});

export default Auth;
