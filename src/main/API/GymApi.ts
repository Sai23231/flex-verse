import apiClientNoAuth from './clientFactoryNoAuth';

import type { PageFilterProps } from '../resources/FindAGym';
import type { Amenities, Gym, SupportedLocation } from '../resources/Models';
import type { ReviewItem } from '../resources/Reviews/Reviews';
import apiClient from './clientFactory';

export class GymApi {
  GYM_DETAILS_ENDPOINT = '/gym';
  private _clientNoAuth = apiClientNoAuth;
  private _client = apiClient;

  public async getGymDetails(gymId: string | undefined): Promise<Gym> {
    return await this._clientNoAuth.get(
      `${this.GYM_DETAILS_ENDPOINT}/${gymId}`
    );
  }

  public async getAllGymAmenities(): Promise<Amenities[]> {
    return await this._clientNoAuth.get(
      `${this.GYM_DETAILS_ENDPOINT}/allGymAmenities`
    );
  }

  public async getSupportedLocations(
    country?: string | undefined,
    state?: string | undefined
  ): Promise<string[]> {
    const queryParams: string[] = [];
    let endpoint = `${this.GYM_DETAILS_ENDPOINT}/allSupportedLocations`;
    if (country !== undefined && country !== '') {
      queryParams.push(`country=${country}`);
    }
    if (state !== undefined && state !== '') {
      queryParams.push(`state=${state}`);
    }
    if (queryParams.length > 0) {
      endpoint += `?${queryParams.join('&')}`;
    }
    return await this._clientNoAuth.get(endpoint);
  }

  public async getGymList(
    page: number,
    pageFilters: PageFilterProps
  ): Promise<Gym[]> {
    const defaultFilters = {
      country: null,
      state: null,
      city: null,
      amenity: null,
    };
    let endpoint = `${this.GYM_DETAILS_ENDPOINT}/getAll/${page}`;
    const queryParams: string[] = [];
    if (
      pageFilters.country !== defaultFilters.country &&
      pageFilters.country !== ''
    ) {
      queryParams.push(`country=${pageFilters.country}`);
    }
    if (
      pageFilters.state !== defaultFilters.state &&
      pageFilters.state !== ''
    ) {
      queryParams.push(`state=${pageFilters.state}`);
    }
    if (pageFilters.city !== defaultFilters.city && pageFilters.city !== '') {
      queryParams.push(`city=${pageFilters.city}`);
    }
    if (
      pageFilters.amenity !== defaultFilters.amenity &&
      pageFilters.amenity !== ''
    ) {
      queryParams.push(`amenities=${pageFilters.amenity}`);
    }
    if (queryParams.length > 0) {
      endpoint += `?${queryParams.join('&')}`;
    }
    return await this._clientNoAuth.get(endpoint);
  }

  public async getGymListCount(): Promise<number> {
    return await this._clientNoAuth.get(
      `${this.GYM_DETAILS_ENDPOINT}/getTotalCount`
    );
  }

  public async submitReview(gymData: any): Promise<any> {
    const data = await this._client.post(
      `${this.GYM_DETAILS_ENDPOINT}/submitReview`,
      gymData
    );
    return data;
  }
}

export const gymApi = new GymApi();
