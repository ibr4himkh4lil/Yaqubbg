import { useState } from "react";

export default function Home() {
  const [finalImage, setFinalImage] = useState(null);
  const [bgColor, setBgColor] = useState("#00ffff");

  async function handleUpload(e) {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch("/api/remove-bg", {
      method: "POST",
      body: fd,
    });

    const blob = await res.blob();
    const imgURL = URL.createObjectURL(blob);
    applyBackground(imgURL, bgColor);
  }

  function applyBackground(imgURL, color) {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const final = canvas.toDataURL("image/png");
      setFinalImage(final);
    };

    img.src = imgURL;
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#2563eb" }}>YaqubBG</h1>
      <p>AI Background Remover</p>

      <input type="file" onChange={handleUpload} />
      <br /><br />

      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />

      <br /><br />

      <canvas id="canvas" style={{ display: "none" }} />

      {finalImage && (
        <>
          <img src={finalImage} style={{ maxWidth: "300px" }} />
          <br /><br />
          <a href={finalImage} download="yaqubbg.png">
            <button>Download</button>
          </a>
        </>
      )}
    </div>
  );
}
