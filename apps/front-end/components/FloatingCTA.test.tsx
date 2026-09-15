import { render, screen, act, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import FloatingCTA from './FloatingCTA';

describe('FloatingCTA', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it('renders correctly', () => {
    render(<FloatingCTA />);
    
    // Check if the phone link has correct href
    const linkElement = screen.getByRole('link', { name: /call for locksmith service/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'tel:+6492431404');
  });

  it('displays the chat bubble initially and hides it after 6 seconds', () => {
    render(<FloatingCTA />);
    
    // Bubble should be visible initially
    expect(screen.getByText('24/7 Emergency Lockout Service')).toBeInTheDocument();
    
    // Fast-forward time by 6 seconds
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    
    // Bubble should be hidden now
    expect(screen.queryByText('24/7 Emergency Lockout Service')).not.toBeInTheDocument();
  });
});
