import PDF417 from "pdf417-generator";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const BarcodeCanvas = styled.canvas`
  width: 100%;
`;

const CanvasContainer = styled.div`
  width: 200px;
  border-radius: 3px;
  padding: 10px;
  background-color: #fff;
`;

export default function App() {
  const [value, setValue] = useState('')
  const canvas = useRef(null);

  function download(){
    var canvas = document.getElementById("canvas");
    var url = canvas.toDataURL("image/jpeg");
    var link = document.createElement('a');
    link.download = 'barcode-hemit.jpeg';
    link.href = url;
    link.click();
  }
  
  useEffect(() => {
    if (canvas.current) {
      PDF417.draw(value, canvas.current, 3);
    }
  }, [canvas, value]);

  return (
    <div className="App">
      <h1>{value}</h1>
      <input placeholder="Enter Text Here" type='text' onChange={e => setValue(e.target.value)}/>

      <CanvasContainer>
        <BarcodeCanvas ref={canvas} id="canvas"/>
      </CanvasContainer>
      <button onClick={download}>download</button>
    </div>
  );
}
