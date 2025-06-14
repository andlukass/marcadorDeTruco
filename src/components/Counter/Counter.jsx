import ChangeName from "../ChangeName/ChangeName";
import { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function Counter(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(35);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    let length = props.team.name.length;
    let newSize;
    if (length >= 1 && length <= 4) {
      setTeamName(props.team.name);
      newSize = 45;
    } else if (length > 4 && length <= 10) {
      setTeamName(props.team.name);
      newSize = 180 / length;
    } else if (length > 10 && length < 20) {
      setTeamName(breakLine(props.team.name));
      newSize = 23;
    } else {
      setTeamName(breakLine(props.team.name).slice(0, 16) + "...");
      newSize = 23;
    }
    setFontSize(newSize);
  }, [props.team.name]);

  const breakLine = (string) => {
    let half = Math.floor(string.length / 2);
    if (string.length > 16) {
      half = 8;
    }
    let part1 = string.slice(0, half);
    let part2 = string.slice(half, string.length);
    let full = part1 + "-\n" + part2;
    let spaces = string.split(" ").length - 1;
    if (spaces) {
      return string;
    } else {
      return full;
    }
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleClick = (change) => {
    props.pointsChange(props.team.name, change);
  };

  return (
    <>
      <ChangeName
        nameChange={props.nameChange}
        teamName={props.team.name}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className={`mx-auto flex flex-col items-center justify-center text-center select-none ${props.className}`}>
        <div className="mx-auto mt-[50px] flex h-[13vh] flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-all duration-300" onClick={onOpen}>
          <BsPencilSquare />
          <div className="flex items-center justify-center text-center mt-1">
            <h3 style={{ fontSize: `${fontSize}px`, whiteSpace: "pre-line" }}>
              {teamName}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-center w-full cursor-pointer active:scale-[0.80] transition-all duration-300" onClick={() => handleClick(1)}>
          <h1 className="text-[120px] font-bold">{props.team.points}</h1>
        </div>
        <div className="mb-[50px] flex cursor-pointer">
          <div onClick={() => handleClick(-1)} className="flex items-center justify-center active:scale-[0.80] transition-all duration-300">
            <div
              className="flex h-[50px] w-[50px] items-center justify-center rounded-[50px] border-2 border-white bg-[rgb(75,140,82)] text-[30px] font-bold text-white m-5"
              >
              <FaMinus className="text-white w-4 h-4" />
            </div>
          </div>
          <div onClick={() => handleClick(1)} className="flex items-center justify-center active:scale-[0.80] transition-all duration-300">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[50px] border-2 border-white bg-[rgb(75,140,82)] text-[30px] font-bold text-white m-5">
              <FaPlus className="text-white w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Counter;
