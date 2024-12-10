import ChangeName from "../ChangeName/ChangeName";
import { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import "./Counter.css";

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
      <div className="counter" style={{ userSelect: "none" }}>
        <div className="titleBox">
          <div className="cursor-pointer" onClick={onOpen}>
            <BsPencilSquare />
          </div>
          <div className="title">
            <h3 style={{ fontSize: `${fontSize}px`, whiteSpace: "pre-line" }}>
              {teamName}
            </h3>
          </div>
        </div>
        <h1>{props.team.points}</h1>
        <div style={{ cursor: "pointer" }} className="buttonsBox">
          <div
            className="pointsButton flex items-center justify-center"
            onClick={() => handleClick(-1)}
          >
            <span className="-mt-2"> - </span>
          </div>
          <div
            className="pointsButton  flex items-center justify-center"
            onClick={() => handleClick(1)}
          >
            <span className="-mt-2"> + </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Counter;
