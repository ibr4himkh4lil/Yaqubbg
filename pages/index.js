import { useState } from "react";

export default function Home() {
  const [output, setOutput] = useState(null);
  const [bg, setBg] = useState("#ffffff");

  async function upload(e) {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch("/api/remove-bg", {
      method: "POST",
      body: fd
    });

    const blob = await res.blob();
    setOutput(URL.createObjectURL(blob));
  }

  return (
    <div style={{padding:"40px",fontFamily:"Arial"}}>
      <h1 style={{color:"#2563eb"}}>YaqubBG</h1>
      <p>AI Background Remover</p>

      <input type="file" onChange={upload} /><br/><br/>

      <input type="color" value={bg} onChange={e=>setBg(e.target.value)} />

      {output && (
        <div style={{marginTop:"20px",background:bg,padding:"20px"}}>
          <img src={output} style={{maxWidth:"300px"}}/>
        </div>
      )}
    </div>
  );
}
