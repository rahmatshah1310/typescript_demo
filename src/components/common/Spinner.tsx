import React from "react";
import { HashLoader, FadeLoader, BeatLoader } from "react-spinners";


// interface for spinerprops
interface SpinnerProps{
  type?:"fade" | "sync" | "beat";
  color?:string;
  size?:number;
  width?:number;
  height?:number;
}
const Spinner:React.FC<SpinnerProps> = ({
  type = "fade",
  color = "white",
  size = 15,
  width = 4,
  height = 4,
}) => {
  return (
    <>
      {type === "fade" && (
        <FadeLoader color={color} height={height} width={width} />
      )}
      {type === "sync" && <HashLoader color={color} size={size} />}
      {type === "beat" && <BeatLoader color={color} size={size} />}
    </>
  );
};

export default Spinner;
