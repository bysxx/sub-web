// import React from 'react';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
//   if (!isOpen) return null;

//   return (
//     // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="rounded bg-white p-6 shadow-lg">
//         <h2 className="mb-4 text-lg font-bold">매수하기</h2>
//         <p className="mb-6">매수할까요?</p>
//         <div className="flex flex-row justify-items-stretch">
//           <button className="rounded bg-secondary-r100 text-white" onClick={onClose}>
//             안할래요
//           </button>
//           <button className="rounded bg-[#53CC5F] text-white" onClick={onConfirm}>
//             좋아요
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
// /components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-gray-800 p-3 opacity-90 shadow-lg">
        <div className="px-4 py-5 text-center text-[17px] font-semibold text-white">{message}</div>
        <div className="grid grid-cols-2 justify-stretch gap-0">
          <button className="rounded bg-gray-800 px-4 py-2 text-blue-500" onClick={onClose}>
            아니오
          </button>
          <button className="rounded bg-gray-800 px-4 py-2 text-blue-500" onClick={onConfirm}>
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
