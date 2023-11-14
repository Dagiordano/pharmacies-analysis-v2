const fs = require('fs').promises;
const path = require('path');

async function WRF(fileName, data) {
  try {
    const outputPath = path.join(__dirname, 'salida', fileName);
    await fs.mkdir(path.dirname(outputPath), { recursive: true }); 
    await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
    console.log(`archivo ${fileName} creado en carpeta 'salida'.`);
  } catch (error) {
    console.error('Error:', error.message);
    throw error; 
  }
}

module.exports = WRF;
