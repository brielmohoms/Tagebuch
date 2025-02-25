// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getToken = () => {
  return localStorage.getItem('token');
};

// Fetch all journal entries for the logged-in user
export const fetchJournalEntries = async () => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/journal`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch journal entries');
  }
  return response.json();
};

// Create (oder save/updaten) eines Journal-Eintrags
export const createJournalEntry = async (entry) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/journal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to create/save journal entry: ${errorData.message || response.statusText}`
    );
  }
  return response.json();
};

export const deleteJournalEntry = async (entryId) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/journal/${entryId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to delete journal entry: ${response.statusText}`);
  }
  return response.json();
};

// Fetch today's motivational message (no auth required)
export const fetchMotivationalMessage = async () => {
  const response = await fetch(`${API_BASE_URL}/api/motivation`);
  if (!response.ok) {
    throw new Error('Failed to fetch motivational message');
  }
  return response.json();
};

// Submit feedback (requires auth)
export const submitFeedback = async (feedback) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(feedback),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to submit feedback: ${errorData.error || response.statusText}`);
  }
  return response.json();
};

// Fetch all public feedback (no auth required)
export const fetchPublicFeedback = async () => {
  const response = await fetch(`${API_BASE_URL}/api/feedback/public`);
  if (!response.ok) {
    throw new Error('Failed to fetch public feedback');
  }
  return response.json();
};
