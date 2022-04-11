import reactDom from "react-dom";
import { Close } from "../../static/image/";

const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 h-screen w-screen bg-slate-700/80 z-20"
    ></div>
  );
};

const ModalBox = ({ title, children, onClose }) => {
  return (
    <div className="fixed md:w-96 sm:w-5/6 w-11/12 mt-2 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white rounded-lg shadow-md shadow-red-300 z-30">
      <div className="flex justify-between p-5">
        <h3 className="text-xl font-medium border-b-2">{title}</h3>
        <button
          type="reset"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
          <Close />
        </button>
      </div>
      {children}
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {reactDom.createPortal(
        <Backdrop {...props} />,
        document.getElementById("backdrop")
      )}
      {reactDom.createPortal(
        <ModalBox {...props} />,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
