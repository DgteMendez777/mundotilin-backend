import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  async trackEvent(
    eventName: string,
    userId?: string,
    params?: Record<string, unknown>,
  ) {
    const measurementId = process.env.GA_MEASUREMENT_ID;
    const apiSecret = process.env.GA_API_SECRET;

    if (!measurementId || !apiSecret) {
      this.logger.warn('Google Analytics no configurado');
      return;
    }

    try {
      await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: userId ?? crypto.randomUUID(),
            user_id: userId,
            events: [
              {
                name: eventName,
                params: {
                  ...params,
                  engagement_time_msec: 100,
                },
              },
            ],
          }),
        },
      );
    } catch (error) {
      this.logger.error('Error enviando evento a GA4', error);
    }
  }
}