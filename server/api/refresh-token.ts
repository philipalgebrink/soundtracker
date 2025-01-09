import axios from 'axios';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ refresh_token: string }>(event);
  const refreshToken = body.refresh_token;

  if (!refreshToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing refresh token',
    });
  }

  const clientId = useRuntimeConfig().spotifyClientId;
  const clientSecret = useRuntimeConfig().spotifyClientSecret;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    return response.data; // Return the new access token
  } catch (error: any) {
    console.error('Error refreshing token:', error.response?.data || error.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to refresh token',
    });
  }
});
