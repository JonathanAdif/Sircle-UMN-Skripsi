import { useState } from "react";

function ReadMoreLess({ children }) {
  const [readMoreShow, setReadMoreShow] = useState(false);

  const toggleReadMore = ()  => {
    setReadMoreShow(prevState => !prevState)
  }

  const showButton = " italic text-sm font-bold text-birulogo-sr cursor-pointer";
  const hideButton = " italic text-sm font-bold text-birulogo-sr cursor-pointer hidden"

  let text = children;
  let length = text.length;

  return (
    <div className="font-medium text-black-sr text-sm !break-words whitespace-pre-line">
      {readMoreShow ? children : children.substr(0,200)}
      <span className={length < 200 ? hideButton : showButton} onClick={toggleReadMore}>
       <span className="text-black-sr"></span> {readMoreShow ? "..Read Less" : "Read More.." } 
      </span>
    </div>
  );
}

export default ReadMoreLess;
