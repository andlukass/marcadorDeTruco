import { useState } from "react";
import Modal from "../modal/modal";

function ChangeName(props) {
  const [inputName, setInputName] = useState("");

  const handleInputChange = (e) => {
    setInputName(e.target.value);
  };

  const handleClick = () => {
    if (inputName.trim().length) props.nameChange(props.teamName, inputName);
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-start items-start p-5">
        <span className="text-gray-900 font-bold text-start text-2xl">
          Nome da equipe:
        </span>
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <input
            className="!bg-white border placeholder:text-gray-400  !border-gray-500 text-2xl text-gray-900 rounded-md h-10 w-60 p-2 mt-2 outline-none"
            placeholder="Digite um nome..."
            onChange={handleInputChange}
          />
          <div
            onClick={handleClick}
            className="w-full cursor-pointer select-none h-10 flex rounded-xl items-center justify-center bg-[rgb(75,140,82)]"
          >
            <span className="text-white text-lg font-bold">✓</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ChangeName;
