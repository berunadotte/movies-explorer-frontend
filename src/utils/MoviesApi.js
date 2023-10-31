class ApiMovies {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res);
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._url}${url}`, options).then(this._checkResponse);
  }

  getMovies() {
    return this._request("/");
  }
}

const apiMovies = new ApiMovies({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default apiMovies;
