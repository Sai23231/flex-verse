import apiClient from './clientFactory';

import type { GroupedAppointment } from '../resources/MyProfile/AvailableAppointments';

export class AppointmentApi {
  private _client = apiClient;
  private APPOINTMENT_API = '/appointment';
  private CREATE_APPOINTMENT_API = '/createAppointment';

  public async bookAppointment(
    date: string,
    time: string | null,
    consultant: string,
    paymentIntentId: string
  ) {
    return await this._client.post(`${this.APPOINTMENT_API}/book`, {
      date: date,
      time: time,
      consultant: consultant,
      paymentIntentId: paymentIntentId,
    });
  }

  public async confirmAppointment(
    appointmentId: string,
    paymentIntentId: string
  ): Promise<void> {
    return await this._client.post(`${this.APPOINTMENT_API}/confirm`, {
      appointmentId: appointmentId,
      paymentIntentId: paymentIntentId,
    });
  }

  public async createAppointments(addAppointment: any) {
    return await this._client.post(this.CREATE_APPOINTMENT_API, addAppointment);
  }

  public async getAllAppointments() {
    return await this._client.get(`${this.APPOINTMENT_API}/getAllAvailable`);
  }

  public async getAllAppointmentsGrouped(): Promise<GroupedAppointment[]> {
    return await this._client.get(
      `${this.APPOINTMENT_API}/getAllAppointmentsGrouped`
    );
  }
}

export const appointmentApi = new AppointmentApi();
