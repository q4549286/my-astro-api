import express from 'express';
import { astro } from 'iztro'; // ���� iztro ��

const app = express();
const port = 3000; // �����ѡ�������˿�

app.use(express.json()); // ʹ�� Express �ܹ����� JSON ������

// ͨ��������ȡ������Ϣ�� API
app.post('/api/astro/solar', (req, res) => {
  const { date, timezone, gender } = req.body;

  if (!date || !timezone || !gender) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const astrolabeSolar = astro.bySolar(date, timezone, gender);
    res.json({ astrolabe: astrolabeSolar });
  } catch (error) {
    console.error('Error processing solar date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ͨ��ũ����ȡ������Ϣ�� API
app.post('/api/astro/lunar', (req, res) => {
  const { date, timezone, gender } = req.body;

  if (!date || !timezone || !gender) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const astrolabeLunar = astro.byLunar(date, timezone, gender);
    res.json({ astrolabe: astrolabeLunar });
  } catch (error) {
    console.error('Error processing lunar date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ����������
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
