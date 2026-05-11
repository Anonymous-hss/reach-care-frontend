const BASE_URL = 'http://20.244.42.192:8002/api';

export const fetchHomeData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/home`, {
      headers: {
        'accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch home data:', error);
    throw error;
  }
};

export const fetchPulseData = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/pulse?limit=${limit}&offset=${offset}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch pulse data:', error);
    throw error;
  }
};

export const fetchSignalDetail = async (signalId) => {
  try {
    const response = await fetch(`${BASE_URL}/pulse/${signalId}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch signal detail:', error);
    throw error;
  }
};

export const fetchSignalReport = async (signalId) => {
  try {
    const response = await fetch(`${BASE_URL}/pulse/${signalId}/report`, {
      headers: {
        'accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch signal report:', error);
    throw error;
  }
};
