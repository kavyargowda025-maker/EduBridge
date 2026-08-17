const fs = require('fs');
const path = require('path');

// Simple 192x192 and 512x512 PNG placeholder bytes
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA_SURBVHhe7cEBDQAAAMKg90t1hkUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwZ36gAAX7D9QkAAAAASUVORK5CYII=';

const buffer = Buffer.from(pngBase64, 'base64');
fs.writeFileSync(path.join(__dirname, 'frontend/public/icon-192.png'), buffer);
fs.writeFileSync(path.join(__dirname, 'frontend/public/icon-512.png'), buffer);
console.log('PNG Icons generated successfully.');
