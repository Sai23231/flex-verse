import apiClientNoAuth from './clientFactoryNoAuth';

import type { PageFilterProps } from '../resources/FindATrainer/FindATrainer';
import type { RatingsSummary, Trainer } from '../resources/Models';
import type { ReviewItem } from '../resources/Reviews/Reviews';

export class TrainerApi {
  TRAINER_DETAILS_ENDPOINT = '/consultant';
  private _clientNoAuth = apiClientNoAuth;

  public async getTrainerDetails(
    trainerId: string | undefined
  ): Promise<Trainer> {
    return await this._clientNoAuth.get(
      `${this.TRAINER_DETAILS_ENDPOINT}/${trainerId}`
    );
  }

  public async getTrainerRatingDetails(
    trainerId: string | undefined
  ): Promise<RatingsSummary> {
    return await this._clientNoAuth.get(
      `${this.TRAINER_DETAILS_ENDPOINT}/${trainerId}/reviewSummary`
    );
  }

  public async getTrainerReviews(
    trainerId: string | undefined,
    page: number
  ): Promise<ReviewItem[]> {
    return await this._clientNoAuth.get(
      `${this.TRAINER_DETAILS_ENDPOINT}/${trainerId}/reviews/${page}`
    );
  }

  public async getTrainerList(
    role: string,
    page: number,
    pageFilters: PageFilterProps
  ): Promise<Trainer[]> {
    const defaultFilters = {
      lowPrice: 0,
      highPrice: 10000,
      specializations: [],
    };
    let endpoint = `${this.TRAINER_DETAILS_ENDPOINT}/getAll/${role}/${page}`;
    const queryParams: string[] = [];
    if (pageFilters.lowPrice !== defaultFilters.lowPrice) {
      queryParams.push(`lowPrice=${pageFilters.lowPrice}`);
    }
    if (pageFilters.highPrice !== defaultFilters.highPrice) {
      queryParams.push(`highPrice=${pageFilters.highPrice}`);
    }
    if (pageFilters.specializations.length > 0) {
      queryParams.push(
        `specializations=${pageFilters.specializations.join(',')}`
      );
    }
    if (queryParams.length > 0) {
      endpoint += `?${queryParams.join('&')}`;
    }
    return await this._clientNoAuth.get(endpoint);
  }

  public async getTrainerListCount(role: string): Promise<number> {
    return await this._clientNoAuth.get(
      `${this.TRAINER_DETAILS_ENDPOINT}/getTotalCount/${role}`
    );
  }

  public async getSpecializations(role: string): Promise<string[]> {
    return await this._clientNoAuth.get(
      `${this.TRAINER_DETAILS_ENDPOINT}/getSpecializations/${role}`
    );
  }

  public async getAvailableAppointments(
    trainerId: string | undefined
  ): Promise<string[]> {
    return await this._clientNoAuth.get(
      `${this.TRAINER_DETAILS_ENDPOINT}/${trainerId}/appointments`
    );
  }
}

export const trainerApi = new TrainerApi();
