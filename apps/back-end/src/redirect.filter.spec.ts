import { describe, it, expect, jest } from '@jest/globals';
import { ArgumentsHost, NotFoundException } from '@nestjs/common';
import { RedirectFilter } from './redirect.filter';

function hostWith(response: Record<string, unknown>): ArgumentsHost {
  return { switchToHttp: () => ({ getResponse: () => response }) } as unknown as ArgumentsHost;
}

describe('RedirectFilter', () => {
  const filter = new RedirectFilter();

  it('redirects unmatched routes to the website', () => {
    const redirect = jest.fn();
    filter.catch(new NotFoundException('Cannot GET /wp-admin'), hostWith({ redirect }));
    expect(redirect).toHaveBeenCalledWith(302, expect.any(String));
  });

  it('returns handler 404s as JSON', () => {
    const json = jest.fn();
    const status = jest.fn<(code: number) => { json: typeof json }>(() => ({ json }));
    filter.catch(new NotFoundException('Invoice not found'), hostWith({ status }));
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invoice not found' }));
  });
});
