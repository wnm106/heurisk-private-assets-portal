const fs = require('fs');
const html = fs.readFileSync('src/components/app/template.html', 'utf8');

// Find the #app div
const appIdx = html.indexOf('id="app"');
if (appIdx >= 0) {
  console.log('Found #app at index:', appIdx);
  console.log('\nContext around #app:');
  console.log(html.slice(appIdx - 100, appIdx + 300));
} else {
  console.log('#app not found');
}

// Check for the main content div
const mainIdx = html.indexOf('class="main"');
if (mainIdx >= 0) {
  console.log('\n\nFound .main at index:', mainIdx);
  console.log('Context:');
  console.log(html.slice(mainIdx - 50, mainIdx + 200));
} else {
  console.log('\n.main not found');
}

// Check the script section for DOMContentLoaded
const scriptIdx = html.indexOf('<script>');
if (scriptIdx >= 0) {
  const domIdx = html.indexOf('DOMContentLoaded', scriptIdx);
  if (domIdx >= 0) {
    console.log('\n\nDOMContentLoaded handler found at:', domIdx);
    console.log('Context:');
    console.log(html.slice(domIdx - 50, domIdx + 300));
  }
}