// Copies the ASCII Magic player and only the pieces this site uses into public/,
// so nothing loads from ascii-magic.com and the other 700+ pieces stay out of the build.
// Run after changing PIECES or upgrading the package: npm run ascii:sync
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const PIECES = ['neural-forward-pass', 'gradient-descent', 'page-404'];

const from = join('node_modules', 'ascii-magic-art');
const to = join('public', 'ascii-magic-art');

rmSync(to, { recursive: true, force: true });
mkdirSync(join(to, 'pieces'), { recursive: true });
for (const dir of ['runtime', 'lib']) cpSync(join(from, dir), join(to, dir), { recursive: true });
for (const file of ['LICENSE', 'NOTICE']) cpSync(join(from, file), join(to, file));
for (const piece of PIECES) cpSync(join(from, 'pieces', `${piece}.js`), join(to, 'pieces', `${piece}.js`));

console.log(`ascii-magic-art: copied runtime, lib and ${PIECES.length} pieces to ${to}`);
