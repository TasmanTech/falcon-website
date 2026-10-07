import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AnalyticsWrapper from './AnalyticsWrapper';

describe('AnalyticsWrapper', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('loads analytics once the page is idle, without needing an interaction', () => {
    render(
      <AnalyticsWrapper>
        <div data-testid="analytics" />
      </AnalyticsWrapper>,
    );
    expect(screen.queryByTestId('analytics')).not.toBeInTheDocument();
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.getByTestId('analytics')).toBeInTheDocument();
  });
});
