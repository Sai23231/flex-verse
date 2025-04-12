import apiClient from './clientFactory';

import type { Consultant } from '../resources/Models';

export class ConsultantApi {
  CONSULTANT_ENDPOINT = '/consultant';
  private _client = apiClient;

  public async getConsultantDetails(consultantId: number): Promise<Consultant> {
    return await this._client.get(
      `${this.CONSULTANT_ENDPOINT}/${consultantId}`
    );
  }

  public async editProfile(consultantData: any): Promise<any> {
    const data = await this._client.post(
      `${this.CONSULTANT_ENDPOINT}/editProfile`,
      consultantData
    );
    return data;
  }

  public async submitReview(consultantReviewData: any): Promise<any> {
    const data = await this._client.post(
      `${this.CONSULTANT_ENDPOINT}/submitReview`,
      consultantReviewData
    );
    return data;
  }
}

export const consultantApi = new ConsultantApi();
