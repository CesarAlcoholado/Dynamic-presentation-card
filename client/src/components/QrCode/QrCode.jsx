import { useEffect, useState } from "react";
import QRCode from "qrcode";


export const QrCode = ({companyName}) => {

  const [qr, setQr] = useState("");

  const GenerateQRCode = () => {
    QRCode.toDataURL(
      companyName,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#080808",
          light: "#FFFFFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        setQr(url);
      }
    );
  };

  useEffect(() => {
    GenerateQRCode();
  }, [companyName])
  


  return (<div className="w-40 h-50">{qr && <img src={qr} />}</div>);
}
