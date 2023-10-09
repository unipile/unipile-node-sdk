import { UnipileClient } from '../../src/client';

async function main() {
  try {
    const client = new UnipileClient('your base url', 'your access token');

    //Ask for a QR code
    const response = await client.account.add({
      provider: 'WHATSAPP',
    });

    //Then display the the QR code and scan it to perform the authentication
    if (response.object === 'QrCode') {
      const { qrcodeImage } = response;

      console.log(qrcodeImage);
    }
  } catch (error) {
    console.error('App error:', error);
  }
}
