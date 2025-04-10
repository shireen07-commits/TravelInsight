import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

interface GetQueryFnOptions {
  on401?: 'redirect' | 'returnNull';
}

// Default fetcher function for React Query
export const getQueryFn =
  (options: GetQueryFnOptions = {}) =>
  async ({ queryKey }: { queryKey: string[] }) => {
    const [endpoint] = queryKey;

    try {
      const response = await fetch(endpoint);

      if (response.status === 401) {
        if (options.on401 === 'redirect') {
          window.location.href = '/auth';
          return null;
        } else if (options.on401 === 'returnNull') {
          return null;
        }
      }

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

// Helper for API requests
export async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  data?: any
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, options);

  if (!response.ok) {
    const errorText = await response.text();
    let message = `API error: ${response.status} ${response.statusText}`;
    
    try {
      const errorJson = JSON.parse(errorText);
      message = errorJson.message || message;
    } catch (e) {
      if (errorText) {
        message = errorText;
      }
    }
    
    const error = new Error(message);
    throw error;
  }

  return response;
}