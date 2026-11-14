/**
 * Vercel Serverless Function — proxy Google Sheets reviews
 * Hides the Sheet ID from the frontend and sanitises output
 */
export default async function handler(req, res) {
  // CORS — same origin only (optional extra safety)
  res.setHeader('Access-Control-Allow-Origin', 'https://www.tawancleaning.com');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  const SHEET_ID = '1JLIjPBLuljaB6Lmue5XZB-PE8dXpOeZHM73v2KIWUUA';
  const sheetName = encodeURIComponent('รีวิวลูกค้า');
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(502).json({ error: 'upstream_error', reviews: [] });
    }

    const text = await response.text();
    const json = JSON.parse(text.replace(/^[^(]+\(/, '').replace(/\);?\s*$/, ''));
    const rows = (json.table && json.table.rows) || [];

    // Filter approved reviews with rating >= 4
    const reviews = rows
      .filter(function (r) {
        return (
          r.c &&
          r.c[4] && r.c[4].v >= 4 &&
          r.c[5] && r.c[5].v &&
          r.c[10] && r.c[10].v === 'อนุมัติ'
        );
      })
      .slice(-6)
      .reverse()
      .map(function (r) {
        // Sanitise — return plain data, no HTML
        const name = String((r.c[1] && r.c[1].v) || 'ลูกค้า').slice(0, 100);
        const rating = Math.min(Math.max(parseInt(r.c[4].v, 10) || 5, 1), 5);
        const comment = String((r.c[5] && r.c[5].v) || '').slice(0, 500);
        const date = String((r.c[0] && r.c[0].v) || '').slice(0, 30);
        return { name, rating, comment, date };
      });

    return res.status(200).json({ reviews });
  } catch (err) {
    return res.status(500).json({ error: 'fetch_failed', reviews: [] });
  }
}
