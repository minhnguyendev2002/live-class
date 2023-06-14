import React from "react";
import { Slider } from "antd";

export default function StreamMenu({ showPopupComment }) {
  const showComment = () => {
    showPopupComment();
  };

  return (
    <>
      <div className="absolute bottom-10 left-10 sm:left-10 z-20 hidden sm:inline-block">
        <div className="group">
          <div className="group-hover:h-[150px] sm:group-hover:h-[150px] h-[40px] group-hover:pt-5 duration-300 overflow-hidden w-[40px] flex flex-col bg-white/40 rounded-full px-3">
            <div className="flex-1 invisible group-hover:visible duration-100 transition-all">
              <Slider vertical defaultValue={30} />
            </div>
            <div className="text-center h-[40px] flex flex-col items-center justify-center">
              <i className="text-white fas fa-volume-down text-lg relative" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 w-full z-10">
        <div className="flex items-end sm:items-center justify-start gap-5 pl-10 sm:pl-24">
          <div className="group inline-block sm:hidden">
            <div className="group-hover:h-[150px] sm:group-hover:h-[200px] h-[40px] group-hover:pt-5 duration-300 overflow-hidden w-[40px] flex flex-col bg-white/40 rounded-full px-3">
              <div className="flex-1 invisible group-hover:visible duration-100 transition-all">
                <Slider vertical defaultValue={30} />
              </div>
              <div className="text-center h-[40px] flex flex-col items-center justify-center">
                <i className="text-white fas fa-volume-down text-lg relative" />
              </div>
            </div>
          </div>
          <div
            className="lg:hidden cursor-pointer rounded-full flex flex-col items-center justify-center w-[40px] h-[40px] text-center bg-white/40 duration-300 hover:bg-white/70"
            onClick={showComment}
          >
            <i className="text-white fas fa-comments text-lg" />
          </div>
        </div>
      </div>
    </>
  );
}
