import apiClient from './clientFactory';

import type {
  Appointments,
  ConsultationCounts,
  Memberships,
  User,
} from '../resources/Models';

export class ProfileApi {
  PROFILE_ENDPOINT = '/user';
  private _client = apiClient;

  public async getUserDetails(): Promise<User> {
    return await this._client.get(`${this.PROFILE_ENDPOINT}/details`);
  }

  public async editProfile(userData: any): Promise<any> {
    const data = await this._client.post(
      `${this.PROFILE_ENDPOINT}/editProfile`,
      userData
    );
    return data;
  }

  public async getConsultations(
    page: number,
    status: string[],
    loggedInUserRole: string
  ): Promise<Appointments[]> {
    if (loggedInUserRole == 'CONSULTANT') {
      return await this._client.get(
        `${this.PROFILE_ENDPOINT}/myCustomers/${page}/${status}`
      );
    } else {
      return await this._client.get(
        `${this.PROFILE_ENDPOINT}/appointments/${page}/${status}`
      );
    }
  }

  public async getConsultationsCounts(): Promise<ConsultationCounts> {
    return await this._client.get(`${this.PROFILE_ENDPOINT}/appointmentCounts`);
  }

  public async getMyCustomerCounts(): Promise<ConsultationCounts> {
    return await this._client.get(`${this.PROFILE_ENDPOINT}/myCustomerCounts`);
  }

  public async getMemberships(): Promise<Memberships[]> {
    return await this._client.get(`${this.PROFILE_ENDPOINT}/gymMemberships`);
  }
}

export const profileApi = new ProfileApi();
