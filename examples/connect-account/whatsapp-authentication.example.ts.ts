import { UnipileClient } from 'unipile-node-sdk';
import QRCode from 'qrcode'; //npm install qrcode @types/qrcode

(async function getWhatsappQRCode() {
  try {
    const client = new UnipileClient('your base url', 'your access token');

    const { qrCodeString, code } = await client.account.connectWhatsapp();

    //you can directly scan the QR code from the terminal
    console.log(qrCodeString);

    //The "qrcode" library allows you to transform the initial code to a file, a html canvas, a buffer...
    //Here we are building a file that will appear in the root of the project
    await QRCode.toFile('qrcode.jpg', code);
  } catch (error) {
    console.error(error);
  }
})();
