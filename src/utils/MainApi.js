class ApiMain {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((error) => Promise.reject(error));
  }

  _request(url, options) {
    const updatedOptions = {
      ...options,
    };
    return fetch(url, updatedOptions).then((res) => this._checkResponse(res));
  }

  getUser(token) {
    return this._request(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    });
  }

  signUp({ name, email, password }) {
    return this._request(`${this._url}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  signIn({ email, password }) {
    return this._request(`${this._url}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  getMovies(token) {
    return this._request(`${this._url}movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    });
  }

  deleteCardFromServer(_id, token) {
    return this._request(`${this._url}movies/${_id}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    });
  }

  addMovie(data, token) {
    return this._request(`${this._url}movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      }),
    });
  }

  changeUserInfo(name, email, token) {
    return this._request(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }
}

const apiMain = new ApiMain({
  baseUrl: 'https://api.movies.berunadotte.nomoredomainsrocks.ru/',
});

export default apiMain;
