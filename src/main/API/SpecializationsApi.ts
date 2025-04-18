import apiClientNoAuth from './clientFactoryNoAuth';

import type { SpecializationsObject } from '../resources/ConsultantSingUp/CompleteSignUp';

export class SpecializationsApi {
  SPECIALIZATIONS_ENDPOINT = '/specializations';
  private _client = apiClientNoAuth;

  public async getAllSpecializations(): Promise<SpecializationsObject[]> {
    return await this._client.get(this.SPECIALIZATIONS_ENDPOINT);
  }
}

export const specializationsApi = new SpecializationsApi();
