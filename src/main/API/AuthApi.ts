import apiClient from './clientFactory';
import apiClientNoAuth from './clientFactoryNoAuth';

import type { SignUpFormValuesWithoutFiles } from '../resources/ConsultantSingUp/CompleteSignUp';

export class AuthApi {
  REGISTER_ENDPOINT = '/api/auth/register';
  DELETE_TOKEN_ENDPOINT = '/api/auth/delete/consultant';
  CONSULTANT_REGISTER_ENDPOINT = '/api/auth/consultant/register';
  CONSULTANT_DETAILS_ENDPOINT = '/api/auth/consultant/details';
  CONSULTANT_CREDS_ENDPOINT = '/api/auth/consultant/creds';
  CONSULTANT_IMAGE_ENDPOINT = '/api/auth/consultant/image';
  TOKEN_STATUS_ENDPOINT = '/api/auth/token/status';
  LOGIN_ENDPOINT = '/api/auth/authenticate';
  LOGOUT_ENDPOINT = '/api/v1/auth/logout';
  private _client = apiClient;
  private _clientNoAuth = apiClientNoAuth;

  public async login(username: string, password: string): Promise<any> {
    const data = await this._client.post(this.LOGIN_ENDPOINT, {
      email: username,
      password: password,
    });
    return data;
  }

  public async googleLogin(authToken: string): Promise<any> {
    const data = await this._client.post(this.LOGIN_ENDPOINT, {
      authToken: authToken,
    });
    return data;
  }

  public async signup(userData: any): Promise<any> {
    const data = await this._client.post(this.REGISTER_ENDPOINT, userData);
    return data;
  }

  public async signupConsultant(userData: any): Promise<any> {
    const data = await this._client.post(
      this.CONSULTANT_REGISTER_ENDPOINT,
      userData
    );
    return data;
  }

  public async postDetails(
    confirmationCode: string | undefined,
    details: SignUpFormValuesWithoutFiles
  ): Promise<any> {
    const data = await this._client.post(this.CONSULTANT_DETAILS_ENDPOINT, {
      confirmationCode: confirmationCode,
      details: details,
    });
    return data;
  }

  public async postCertFile(formData: FormData): Promise<any> {
    const data = await this._clientNoAuth.postFile(
      this.CONSULTANT_CREDS_ENDPOINT,
      formData
    );
    return data;
  }

  public async postImageFile(formData: FormData): Promise<any> {
    const data = await this._clientNoAuth.postFile(
      this.CONSULTANT_IMAGE_ENDPOINT,
      formData
    );
    return data;
  }

  public async deactivateToken(
    confirmationCode: string | undefined
  ): Promise<any> {
    const data = await this._clientNoAuth.delete(
      `${this.DELETE_TOKEN_ENDPOINT}/${confirmationCode}`
    );
    return data;
  }

  public async getTokenStatus(
    confirmationCode: string | undefined
  ): Promise<any> {
    const data = await this._clientNoAuth.get(
      `${this.TOKEN_STATUS_ENDPOINT}/${confirmationCode}`
    );
    return data;
  }

  public async logout() {
    await this._client.get(this.LOGOUT_ENDPOINT);
  }
}

export const authApi = new AuthApi();
