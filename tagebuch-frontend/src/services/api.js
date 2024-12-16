const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all journal entries for a specific user
export const fetchJournalEntries = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/journal/${userId}`);
  return response.json();
};

// Create or save a journal entry
export const createJournalEntry = async (entry) => {
  const response = await fetch(`${API_BASE_URL}/journal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return response.json();
};

export const deleteJournalEntry = async (entryId) => {
  const response = await fetch(`${API_BASE_URL}/journal/${entryId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete journal entry: ${response.statusText}`);
  }
};


// Fetch today's motivational message
export const fetchMotivationalMessage = async () => {
  const response = await fetch(`${API_BASE_URL}/motivation`);
  return response.json();
};

// Submit feedback
export const submitFeedback = async (feedback) => {
  const response = await fetch(`${API_BASE_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  return response.json();
};

// Fetch all public feedback
export const fetchPublicFeedback = async () => {
  const response = await fetch(`${API_BASE_URL}/feedback/public`);
  return response.json();
};
