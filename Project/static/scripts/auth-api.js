class AuthApi {
  constructor() {
    this.client = axios.create();
    this.token = undefined;

    this.client.interceptors.request.use((config) => {
      if (!this.token) {
        return config;
      }

      const newConfig = {
        headers: {},
        ...config,
      };
      newConfig.headers.Authorization = `Bearer ${this.token}`;
      return newConfig;
    }, (err) => Promise.reject(err));
  }

  async login(formData) {
    const { data } = await this.client.post('/auth/login/form', formData);
    console.log(data.token);
    this.token = `${data.token}`;

    return data.message;
  }

  async registration(formData) {
    const response = await this.client.post('/auth/registration/form', formData);
    const data = await response.data;
    console.log(data.token);
    this.token = data.token;

    return data.message;
  }

  getCookieToken() {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${'token'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ));
    this.token = matches ? decodeURIComponent(matches[1]) : undefined;
  }
}

const authClient = new AuthApi();
export { authClient };
