import PDF417 from "pdf417-generator";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Button, TextField } from '@material-ui/core';

const Barcode = styled.canvas`
  width: 100%;
`;

const CanvasContainer1 = styled.div`
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
    var url = canvas.toDataURL("image/png");
    var link = document.createElement('a');
    link.download = 'barcode-hemit.png';
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
     
      <TextField placeholder="Enter what you wanna say here" type='text' multiline color="primary" onChange={e => setValue(e.target.value)}/>
        <CanvasContainer1><Barcode ref={canvas} id="canvas"/></CanvasContainer1>
      <Button color="primary"  variant="contained"  onClick={download}>download</Button>
    </div>
  );
}

