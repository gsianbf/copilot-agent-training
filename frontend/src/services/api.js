const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Authenticate user and obtain JWT token.
 * The backend expects application/x-www-form-urlencoded (OAuth2PasswordRequestForm).
 */
export async function login(username, password) {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || 'Credenciales incorrectas');
  }

  return response.json();
}

/**
 * Verify if a token is still valid.
 */
export async function verifyToken(token) {
  const response = await fetch(`${API_BASE_URL}/verify`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  if (!response.ok) throw new Error('Token inválido');
  return response.json();
}
