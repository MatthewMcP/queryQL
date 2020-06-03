/* eslint-disable max-len */
// https://www.tailwindtoolbox.com/components/modal
import React, { useState } from 'react';
import { CardDisplay } from '../index';

const useModal = (data: any[]): [Function, any] => {
  console.log(data);
  const [show, setShow] = useState(false);
  const handleClose = (): void => setShow(false);
  const toggleModal = (): void => {
    setShow(!show);
  };

  const jsxModal = (): JSX.Element => {
    return (
      <>
        {show && (
          <div className="modal modal-active fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-75" />
            <div className="modal-container bg-black w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                <svg
                  onClick={handleClose}
                  className="fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </div>
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <div className="modal-close cursor-pointer z-50">
                    <svg
                      className="fill-current text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                    </svg>
                  </div>
                </div>
                <CardDisplay data={data} />
                <div className="flex justify-end pt-2">
                  <button
                    className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                    onClick={handleClose}
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return [toggleModal, jsxModal];
};

export { useModal };
