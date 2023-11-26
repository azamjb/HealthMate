import axios from 'axios';

async function sendSMS(to, text) {
  const smsData = {
    messages: [
      {
        from: 'azamjb', // This should be a registered alphanumeric sender ID
        destinations: [{ to }],
        text,
      },
    ],
  };

  const apiKey = 'f29d42f1f9415c7d743961820f9a0005-57f84a28-6022-406b-8f4c-290a43d4adce'; 

  try {
    const response = await axios.post('https://4382l6.api.infobip.com/sms/2/text/advanced', smsData, {
      headers: {
        'Authorization': `App ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { to, text } = req.body;
      const result = await sendSMS(to, text);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
