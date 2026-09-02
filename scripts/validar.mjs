// Valida que todos los JSON de src/ parseen. Es la comprobacion rapida
// del playbook: "OK N JSON".
import fs from 'node:fs';
import path from 'node:path';

let n = 0;
const errores = [];
(function recorrer(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const q = path.join(dir, f.name);
    if (f.isDirectory()) recorrer(q);
    else if (f.name.endsWith('.json')) {
      try { JSON.parse(fs.readFileSync(q, 'utf8')); n++; }
      catch (e) { errores.push(`${q}: ${e.message}`); }
    }
  }
})('src');

if (errores.length) { console.error(errores.join('\n')); process.exit(1); }
console.log('OK ' + n + ' JSON');
