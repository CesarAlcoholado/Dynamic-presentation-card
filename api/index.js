import express from 'express';
import colorthief from 'colorthief';
import cors from 'cors';
import { findDissimilarColor, isDarkColor, rgbToHex } from './utils/helpers.js';

const app = express();
app.use(cors());

app.get("/", (req,res) => {
  res.send("hello world")
});

app.get("/card", async (req, res) => {
  const domain = req.query.domain;
  const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const colorthiefPromises = [
    colorthief.getColor(url),
    colorthief.getPalette(url),
  ];
  const [primaryColorRGB, paletteRGB] = await Promise.all(colorthiefPromises);
  const secondaryColorRGB = findDissimilarColor(primaryColorRGB, paletteRGB);
  res.json({
    domain,
    url,
    primaryColorRGB,
    primaryColorHex: rgbToHex(...primaryColorRGB),
    isPrimaryColorDark: isDarkColor(primaryColorRGB),
    secondaryColorRGB,
    secondaryColorHex: rgbToHex(...secondaryColorRGB),
    isSecondaryColorDark: isDarkColor(secondaryColorRGB)
  });
});

app.listen(3000, ()=> {
  console.log('server is running on port 3000');
})