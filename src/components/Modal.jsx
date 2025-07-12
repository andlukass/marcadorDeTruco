function Modal(props) {
  if (!props.isOpen) return null;
  return (
    <div 
      onClick={props.onClose} 
      className="fixed inset-0 bg-black bg-opacity-50 z-[10001]"
    >
      <div className="w-screen h-screen z-[10002]">
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgb(225,225,225)] border border-black rounded-[20px] py-5 px-0"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
