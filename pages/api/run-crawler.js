import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      stdout: '',
      stderr: '',
      message: 'Method not allowed',
    });
  }

  const scriptPath = path.join(process.cwd(), 'crawler.js');

  try {
    const { stdout, stderr } = await execFileAsync(process.execPath, [scriptPath], {
      cwd: process.cwd(),
      timeout: 120000,
      maxBuffer: 1024 * 1024,
    });

    if (stdout) {
      console.log('[run-crawler] stdout:\n', stdout);
    }
    if (stderr) {
      console.warn('[run-crawler] stderr:\n', stderr);
    }

    return res.status(200).json({
      ok: true,
      stdout: stdout || '',
      stderr: stderr || '',
    });
  } catch (error) {
    console.error('[run-crawler] execution failed:', error?.message || error);

    return res.status(500).json({
      ok: false,
      stdout: error?.stdout || '',
      stderr: error?.stderr || '',
      message: error?.message || 'Failed to execute crawler script',
    });
  }
}
