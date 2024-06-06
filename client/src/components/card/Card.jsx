/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import  { useCallback, useRef } from "react";
import { toJpeg, toPng } from "html-to-image";
import download from "downloadjs";
import { QrCode } from '../QrCode/QrCode';
import goBack from "../../assets/goBack.png";

const padStartWithZero = (num = 0) => {
  return num.toString().padStart(7, "0");
};

export const Card = ({cardInfo, setCardInfo, name, proffesion, logo}) => {
  const primaryColor = cardInfo.primaryColorHex;
  const secondaryColor = cardInfo.secondaryColorHex;
  const isPrimaryColorDark = cardInfo.isPrimaryColorDark;
  const isSecondaryColorDark = cardInfo.isSecondaryColorDark;
  const favicon = cardInfo.url;
  const companyName = cardInfo.domain;
  const ticketNo = padStartWithZero(Math.floor(Math.random() * 99999));

  let date = new Date().toJSON().slice(0, 10);
  const hour = new Date().getHours();
  const formattedHour = hour < 10 ? "0" + hour : hour;

  //*html to print
  const ref = useRef(null);
  const printButton = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log("current: ", ref.current);
        console.log(err);
      });
  }, [ref]);
  
  return (
    <>
      <div className="w-full flex flex-col align-center justify-center">
        <div className="my-0 mx-auto">
          <img
            className="h-[50px] w-[50px] mr-auto hover:cursor-pointer"
            src={goBack}
            alt="go back arrow"
            onClick={() => setCardInfo({})}
          />
          <div ref={ref}>
            <div className="flex my-0 mx-auto">
              <div
                className="rounded-l-lg border-r-0 pt-8 pb-4"
                style={{
                  backgroundColor: primaryColor,
                  color: isPrimaryColorDark ? "white" : "black",
                }}
              >
                <div className="flex justify-between items-center px-12 mb-4">
                  <span
                    style={{
                      color: isPrimaryColorDark ? "white" : "black",
                    }}
                    className="text-sm"
                  >
                    Visit us in <strong>{companyName}</strong>
                  </span>
                </div>
                <div
                  style={{
                    color: isPrimaryColorDark ? "white" : "black",
                  }}
                  className="flex h-[130px] text-6xl px-12 mb-2 gap-4"
                >
                  <span className="self-center text-center">
                    Access &gt;&gt;&gt;
                  </span>
                  <QrCode companyName={companyName} />
                </div>

                <div className="flex items-center px-12 mb-4">
                  <span className="text-lg">{date}</span>
                  <span
                    style={{
                      color: secondaryColor,
                    }}
                    className="text-lg mx-3"
                  >
                    /
                  </span>
                  <span className="text-lg">
                    {formattedHour} {formattedHour <= 12 ? "AM" : "PM"}
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: secondaryColor,
                    color: isSecondaryColorDark ? "white" : "black",
                  }}
                  className="w-4/5 flex items-center px-12 py-1"
                >
                    {logo && (
                  <div className="bg-white rounded-full border border-gray-400">
                      <img
                        className="object-contain rounded-full"
                        src={logo}
                        alt={companyName}
                        width={50}
                        height={50}
                      />
                  </div>
                    )}
                  <div className="pl-3">
                    {proffesion ? proffesion : "Desarrollador Front-End"}
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderLeft: `8px dashed ${primaryColor}`,
                }}
                className="bg-white py-8 px-4 text-black text-center [writing-mode:vertical-rl] [text-orientation:mixed]"
              >
                <div className="text-xs">Ticket No.</div>
                <span
                  style={{
                    borderColor: secondaryColor,
                  }}
                  className={`border-l-4 text-2xl`}
                >
                  #{ticketNo}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-3"
        onClick={printButton}
      >
        Download
      </button>
    </>
  );
}
