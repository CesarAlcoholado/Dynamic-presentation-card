import express from 'express';
import colorthief from 'colorthief';
import cors from 'cors';
import { findDissimilarColor, isDarkColor, rgbToHex } from './utils/helpers.js';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://dynamic-presentation-card-6bjh.vercel.app/"
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
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