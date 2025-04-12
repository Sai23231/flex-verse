import apiClientNoAuth from './clientFactoryNoAuth';

import type { ConsultantSummary } from '../resources/Models';

export class HomepageApi {
  HOMEPAGE_ENDPOINT = '/homepage';
  private _client = apiClientNoAuth;

  public async getRecommendedConsultants(
    consultantType: string
  ): Promise<ConsultantSummary[]> {
    return await this._client.get(
      `${this.HOMEPAGE_ENDPOINT}/recommended${consultantType}`
    );
  }
}

export const homepageApi = new HomepageApi();
