const API_BASE_URL = 'http://localhost:5000/api';

export const fetchJournalEntries = async () => {
  const response = await fetch(`${API_BASE_URL}/journal`);
  return response.json();
};

export const createJournalEntry = async (entry) => {
  const response = await fetch(`${API_BASE_URL}/journal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return response.json();
};
