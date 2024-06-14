const express = require("express");
const colorthief = require("colorthief");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const {
  findDissimilarColor,
  isDarkColor,
  rgbToHex,
} = require("./utils/helpers.js");

const port = process.env.PORT || 3000;

const request = process.env.PRODUCTION;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    request
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", (req, res) => {
  try {
    res.status(200).send("hello world");
  } catch (error) {
    console.error(error)
  }
});

app.get("/card", async (req, res) => {
  const domain = req.query.domain;
  try {
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
      isSecondaryColorDark: isDarkColor(secondaryColorRGB),
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
