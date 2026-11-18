const fs = require('fs');

const html = fs.readFileSync(process.env.TEMP + '/dom.html', 'utf8');

// Find all elements with inline style or class that might have fixed width
const classMatches = html.match(/class="[^"]*"/g) || [];
const wideClasses = new Set();
for (const c of classMatches) {
  if (c.includes('min-w-') || c.includes('w-[') || c.includes('grid-cols-')) {
    wideClasses.add(c);
  }
}

console.log('Classes with min-w, fixed width, or grid:');
console.log(Array.from(wideClasses).join('\n'));
