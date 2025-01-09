import axios from 'axios';

export default defineEventHandler(async (event) => {
  try {
    // Parse the request body
    const body = await readBody<{ code: string; redirect_uri: string }>(event);

    if (!body.code || !body.redirect_uri) {
      console.error('Missing required parameters:', body);
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing authorization code or redirect URI',
      });
    }

    const clientId = useRuntimeConfig().spotifyClientId;
    const clientSecret = useRuntimeConfig().spotifyClientSecret;

    // Log key values for debugging
    console.log('Authorization Code:', body.code);
    console.log('Redirect URI:', body.redirect_uri);

    // Make the request to Spotify
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: body.code,
        redirect_uri: body.redirect_uri,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Spotify Token Response:', response.data);
    return response.data; // Return tokens
  } catch (error: any) {
    console.error('Spotify API Error:', error.response?.data || error.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to exchange token with Spotify',
    });
  }
});
