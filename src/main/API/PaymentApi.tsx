import apiClient from './clientFactory';

interface PaymentResponse {
  url: string; // Define the expected response structure
}

export class PaymentApi {
  private _client = apiClient;
  private PAYMENT_API = '/appointment';

  /**
   * Initiates a payment session for booking an appointment.
   * @param {string} firstName - Customer first name
   * @param {string} email - Customer email
   * @param {string} consultantId - ID of the consultant
   * @param {string} appointmentDate - Date of appointment
   * @param {string} appointmentTime - Time of appointment
   * @returns {Promise<string>} - Redirect URL for Stripe checkout
   */
  public async initiatePayment(
    firstName: string,
    email: string,
    consultantId: string,
    appointmentDate: string,
    appointmentTime: string
  ): Promise<any> {
    const response = await this._client.post(`${this.PAYMENT_API}/book`, {
      items: [{ name: 'Consultation Appointment', id: consultantId }],
      customerName: firstName,
      customerEmail: email,
      consultantId,
      appointmentDate,
      appointmentTime,
    });
    return response;
  }
}

export const paymentApi = new PaymentApi();
