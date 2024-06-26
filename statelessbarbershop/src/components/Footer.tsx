"use client";
import React, { useEffect, useState } from "react";

interface ComponentProps {
  className?: string;
}

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Use 'America/Denver' for Mountain Standard Time (MST)
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Denver", // Adjust if necessary for your specific region within MST
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit", // Include seconds
        hour12: false,
      });

      setCurrentTime(now);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  return <span>{currentTime}</span>;
};

export default function Footer({ className }: ComponentProps) {
  return (
    <footer
      className={`${className} relative flex flex-col items-start justify-between w-full bg-white overflow-hidden`}
    >
      {/* Header */}
      <header className="flex flex-col items-start justify-start w-full pt-4 sm:pt-10 px-4 sm:px-10 font-medium sm:font-medium z-20 text-white mix-blend-difference">
        {/* <div className="flex flex-row items-start justify-between w-full uppercase small-text mb-6 sm:mb-[4vw] z-10">
     <CharByCharOnScroll className="-mt-1" shadow end={85}>
      Footer
     </CharByCharOnScroll>
     <p className="">[S.04]</p>
    </div> */}
      </header>
      <div className="flex flex-col flex-grow items-start justify-end w-full text-white mix-blend-difference px-4 sm:px-10 pb-4 sm:py-10 z-10">
        <div className="flex flex-row items start justify-between w-full h-full uppercase font-semibold medium-text">
          <div></div>
        </div>
        <ul className="grid grid-cols-2 gap-y-[15vw] md:grid-cols-4 items start justify-between w-full h-full uppercase font-medium small-text">
          {/* Site credits */}
          <li className="flex flex-col items-start justify-between w-full h-auto gap-y-[5vw] sm:gap-y-[1vw]">
            <div>Stateless . ©2024</div>

            <div className="relative flex flex-col gap-y-[5vw] sm:gap-y-0">
              <span>Site By</span>
              <a
                href="https://relaydigital.agency"
                className="bottom-0 flex flex-row items-center group hover:font-bold duration-100"
                aria-label="Visit RelayDigital Agency website"
              >
                <div className="hidden md:block absolute w-[1.5vw] h-[1.5vw] md:w-[0.5vw] md:h-[0.5vw] bg-white -ml-4 duration-100 transform scale-x-0 group-hover:scale-x-100 origin-right"></div>
                RelayDigital® Agency
              </a>
            </div>
          </li>
          {/* Time */}
          <li className="flex flex-col items-start justify-between w-full h-auto gap-y-[5vw] sm:gap-y-[1vw]">
            <div className="flex items-end justify-end md:justify-start w-full">
              <CurrentTime />
            </div>

            <div className="relative flex flex-col items-end justify-end md:items-start md:justify-start w-full gap-y-[5vw] sm:gap-y-0">
              {/* <a
        href="https://relaydigital.agency"
        className="bottom-0 flex flex-row items-center group hover:font-bold duration-100"
       >
        <div className="hidden md:block absolute w-[1.5vw] h-[1.5vw] md:w-[0.5vw] md:h-[0.5vw] bg-white -ml-4 duration-100 transform scale-x-0 group-hover:scale-x-100 origin-right"></div>
        YYC/YXE 🔜 SYD
       </a> */}
              <span className="flex items-end justify-end md:justify-start w-full">
                📍 Caracasbaai weg 197 E
              </span>
            </div>
          </li>
          {/* Socials */}
          <li className="flex flex-col items-start justify-between flex-grow h-auto gap-y-[5vw] sm:gap-y-[1vw]">
            <div>Reach Out</div>

            <div className="relative flex flex-col gap-y-[5vw] sm:gap-y-0">
              <a
                href="mailto:info@relaydigital.agency"
                className="bottom-0 flex flex-row items-center group hover:font-bold duration-100 small-text"
                aria-label="Email Stateless"
              >
                <div className="hidden md:block absolute w-[1.5vw] h-[1.5vw] md:w-[0.5vw] md:h-[0.5vw] bg-white -ml-4 duration-100 transform scale-x-0 group-hover:scale-x-100 origin-right"></div>
                Statelessbarbershop@gmail.com
              </a>

              {/* Social Media SVGs */}
              <div className="flex w-full h-[10.5vw] md:h-[1.5vw]">
                <ul className="flex flex-row items-center gap-[1vw]">
                  {/* LinkedIn */}
                  <li>
                    <a
                      className="followerchangetest"
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit LinkedIn"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[10vw] md:w-[1vw] h-[10vw] md:h-[1vw] text-light-primary dark:text-dark-primary"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.66667 0C1.1939 0 0 1.1939 0 2.66667V29.3333C0 30.806 1.1939 32 2.66667 32H29.3333C30.806 32 32 30.806 32 29.3333V2.66667C32 1.1939 30.806 0 29.3333 0H2.66667ZM9.81468 7.11595C9.82469 8.81595 8.5522 9.86345 7.04219 9.85595C5.61968 9.84844 4.37968 8.71595 4.38718 7.11845C4.39468 5.61595 5.58219 4.40844 7.12469 4.44345C8.68969 4.47845 9.82469 5.62596 9.81468 7.11595ZM16.4972 12.0209H12.0173H12.0148V27.2384H16.7497V26.8834C16.7497 26.208 16.7492 25.5324 16.7486 24.8567C16.7472 23.0544 16.7456 21.2501 16.7548 19.4484C16.7573 19.0108 16.7772 18.5559 16.8898 18.1383C17.3122 16.5783 18.7148 15.5708 20.2798 15.8185C21.2848 15.9758 21.9497 16.5584 22.2297 17.506C22.4023 18.0983 22.4798 18.7358 22.4873 19.3534C22.5076 21.2158 22.5047 23.0782 22.5019 24.9408C22.5008 25.5982 22.4997 26.256 22.4997 26.9134V27.2359H27.2498V26.8709C27.2498 26.0674 27.2494 25.264 27.2489 24.4606C27.248 22.4526 27.2469 20.4446 27.2523 18.4359C27.2548 17.5284 27.1573 16.6334 26.9348 15.7559C26.6023 14.4508 25.9148 13.3708 24.7973 12.5909C24.0048 12.0359 23.1348 11.6784 22.1623 11.6384C22.0516 11.6338 21.9399 11.6278 21.8277 11.6217C21.3305 11.5948 20.8251 11.5675 20.3497 11.6634C18.9897 11.9359 17.7948 12.5584 16.8923 13.6558C16.7874 13.7817 16.6848 13.9095 16.5317 14.1003L16.4972 14.1435V12.0209ZM4.76736 27.2434H9.47986V12.0308H4.76736V27.2434Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </li>
                  {/* Facebook */}
                  <li>
                    <a
                      className="followerchangetest"
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Facebook"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[10vw] md:w-[1vw] h-[10vw] md:h-[1vw] text-light-primary dark:text-dark-primary"
                      >
                        <path
                          d="M32 16.0978C32 7.20722 24.8366 0 16 0C7.16344 0 0 7.20722 0 16.0978C0 24.1325 5.85094 30.7923 13.5 32V20.751H9.4375V16.0978H13.5V12.5512C13.5 8.51674 15.8888 6.28819 19.5434 6.28819C21.2941 6.28819 23.125 6.60261 23.125 6.60261V10.5642H21.1075C19.12 10.5642 18.5 11.8052 18.5 13.0782V16.0978H22.9374L22.2282 20.751H18.5V32C26.1491 30.7923 32 24.1328 32 16.0978Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </li>
                  {/* Instagram */}
                  <li>
                    <a
                      className="followerchangetest"
                      href="https://www.instagram.com/stateless_barbershop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Instagram"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[10vw] md:w-[1vw] h-[10vw] md:h-[1vw] text-light-primary dark:text-dark-primary"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.1111 0H8.88889C3.9797 0 0 3.9797 0 8.88889V23.1111C0 28.0203 3.9797 32 8.88889 32H23.1111C28.0203 32 32 28.0203 32 23.1111V8.88889C32 3.9797 28.0203 0 23.1111 0ZM28.8889 23.1111C28.8791 26.298 26.298 28.8791 23.1111 28.8889H8.88889C5.70196 28.8791 3.12087 26.298 3.11111 23.1111V8.88889C3.12087 5.70196 5.70196 3.12087 8.88889 3.11111H23.1111C26.298 3.12087 28.8791 5.70196 28.8889 8.88889V23.1111ZM24.4444 9.33333C25.4263 9.33333 26.2222 8.53739 26.2222 7.55556C26.2222 6.57372 25.4263 5.77778 24.4444 5.77778C23.4626 5.77778 22.6667 6.57372 22.6667 7.55556C22.6667 8.53739 23.4626 9.33333 24.4444 9.33333ZM16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24.0048 13.8768 23.1634 11.8392 21.662 10.3379C20.1607 8.8366 18.1232 7.99527 16 8ZM11.1111 16C11.1111 18.7001 13.2999 20.8889 16 20.8889C18.7001 20.8889 20.8889 18.7001 20.8889 16C20.8889 13.2999 18.7001 11.1111 16 11.1111C13.2999 11.1111 11.1111 13.2999 11.1111 16Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          {/* Legal */}
          <li className="flex flex-col items-start justify-between h-auto gap-y-[5vw] sm:gap-y-[1vw]">
            <div className="flex items-end justify-end w-full">Legal</div>

            <div className="relative flex flex-col items-end justify-end w-full gap-y-[5vw] sm:gap-y-0">
              <a
                href="https://relaydigital.agency"
                className="bottom-0 flex flex-row items-center group hover:font-bold duration-100"
                aria-label="Visit Disclaimer Page"
              >
                <div className="hidden md:block absolute w-[1.5vw] h-[1.5vw] md:w-[0.5vw] md:h-[0.5vw] bg-white -ml-4 duration-100 transform scale-x-0 group-hover:scale-x-100 origin-right"></div>
                Disclaimer
              </a>
              <span className="flex items-end justify-end w-full">
                All Rights Reserved
              </span>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
}
