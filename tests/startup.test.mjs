import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

for (const [index, [directory, command]] of [
  ['', 'dev'], ['', 'start'],
  ['apps/moment-booth-fe', 'dev'], ['apps/moment-booth-fe', 'start'],
].entries()) {
  test(`${directory || 'root'}: yarn ${command} serves the website`, { timeout: 120_000 }, async () => {
    const port = 15370 + index;
    const child = spawn('yarn', [command, '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
      cwd: `${root}${directory}`, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    child.stdout.on('data', (data) => { output += data; });
    child.stderr.on('data', (data) => { output += data; });
    try {
      const deadline = Date.now() + 110_000;
      while (Date.now() < deadline) {
        assert.equal(child.exitCode, null, output);
        if (output.includes(`http://127.0.0.1:${port}`)) {
          const response = await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(30_000) });
          assert.equal(response.status, 200, output);
          assert.match(await response.text(), /Moment Booth/);
          return;
        }
        await delay(250);
      }
      assert.fail(`Server did not become ready:\n${output}`);
    } finally {
      try { process.kill(-child.pid, 'SIGTERM'); } catch (error) {
        if (error.code !== 'ESRCH') throw error;
      }
    }
  });
}
