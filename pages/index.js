import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const [bg, setBg] = useState("#00ffff");

  async function upload(e) {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch("/api/remove-bg", {
      method: "POST",
      body: fd,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    drawWithBg(url, bg);
  }

  function drawWithBg(imgUrl, color) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      setResult(canvas.toDataURL("image/png"));
    };
    img.src = imgUrl;
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#2563eb" }}>YaqubBG</h1>
      <p>AI Background Remover</p>

      <input type="file" onChange={upload} />
      <br /><br />

      <input
        type="color"
        value={bg}
        onChange={(e) => {
          setBg(e.target.value);
          if (result) drawWithBg(result, e.target.value);
        }}
      />

      <br /><br />

      <canvas id="canvas" style={{ display: "none" }} />

      {result && (
        <img src={result} style={{ maxWidth: "300px", border: "1px solid #ccc" }} />
      )}
    </div>
  );
        }
