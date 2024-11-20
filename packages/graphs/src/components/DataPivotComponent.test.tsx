// src/components/DataPivotComponent.test.tsx

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DataPivotComponent from './DataPivotComponent';

// Mock fetch
global.fetch = vi.fn();

const mockResponse = {
  data: {
    a: [
      { mtu: 1, edate: 241121, prop1: 10, prop2: 20, prop3: 30 },
      { mtu: 2, edate: 241121, prop1: 15, prop2: 25, prop3: 35 },
    ],
    b: [
      { mtu: 1, edate: 241121, prop1: 5, prop2: 10, prop3: 15 },
      { mtu: 2, edate: 241121, prop1: 7, prop2: 12, prop3: 17 },
    ],
  },
};

describe('DataPivotComponent', () => {
  beforeEach(() => {
    (fetch as unknown as vi.Mock).mockClear()
  });

  it('renders loading state initially', async () => {
    (fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<DataPivotComponent endpoint="/api/data" />);

    expect(screen.getByText(/loading data.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/loading data.../i)).not.toBeInTheDocument());
  });

  it('renders pivoted table with fetched data', async () => {
    (fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<DataPivotComponent endpoint="/api/data" />);

    await waitFor(() => {
      expect(screen.getByText('Pivoted Data')).toBeInTheDocument();
    });

    // Check table headers
    expect(screen.getByText('Property')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();

    // Check table rows
    expect(screen.getByText('prop1')).toBeInTheDocument();
    expect(screen.getByText('10, 15')).toBeInTheDocument();
    expect(screen.getByText('5, 7')).toBeInTheDocument();

    expect(screen.getByText('prop2')).toBeInTheDocument();
    expect(screen.getByText('20, 25')).toBeInTheDocument();
    expect(screen.getByText('10, 12')).toBeInTheDocument();

    expect(screen.getByText('prop3')).toBeInTheDocument();
    expect(screen.getByText('30, 35')).toBeInTheDocument();
    expect(screen.getByText('15, 17')).toBeInTheDocument();
  });

  it('toggles to normal table view', async () => {
    (fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<DataPivotComponent endpoint="/api/data" />);

    // Wait for pivoted table to load
    await waitFor(() => {
      expect(screen.getByText('Pivoted Data')).toBeInTheDocument();
    });

    // Click the toggle button
    const toggleButton = screen.getByRole('button', { name: /show normal table/i });
    userEvent.click(toggleButton);

    // Check for normal table
    await waitFor(() => {
      expect(screen.getByText('Normal Data')).toBeInTheDocument();
    });

    // Check normal table headers
    expect(screen.getByText('MTU')).toBeInTheDocument();
    expect(screen.getByText('EDate')).toBeInTheDocument();
    expect(screen.getByText('Prop1')).toBeInTheDocument();
    expect(screen.getByText('Prop2')).toBeInTheDocument();
    expect(screen.getByText('Prop3')).toBeInTheDocument();

    // Check normal table data for query 'a'
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('241121')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    (fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    render(<DataPivotComponent endpoint="/api/data" />);

    await waitFor(() => {
      expect(screen.getByText(/error: internal server error/i)).toBeInTheDocument();
    });
  });

  it('allows adding a new query', async () => {
    (fetch as unknown as vi.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    window.prompt = vi.fn().mockReturnValue('c');

    render(<DataPivotComponent endpoint="/api/data" />);

    // Wait for initial data fetch
    await waitFor(() => {
      expect(screen.getByText('Pivoted Data')).toBeInTheDocument();
    });

    // Click the add query button
    const addQueryButton = screen.getByText(/add query/i);
    userEvent.click(addQueryButton);

    // Expect prompt to be called
    expect(window.prompt).toHaveBeenCalledWith('Enter new query string:');

    // After adding, fetch should be called again with updated queries
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
