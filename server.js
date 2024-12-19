import express from 'express';
import { astro } from 'iztro'; // 导入 iztro 库

const app = express();
const port = 3000; // 你可以选择其他端口

app.use(express.json()); // 使得 Express 能够解析 JSON 请求体

// 通过阳历获取星盘信息的 API
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

// 通过农历获取星盘信息的 API
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

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
