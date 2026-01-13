import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    const image = files.image;

    const formData = new FormData();
    formData.append("image_file", fs.createReadStream(image.filepath));
    formData.append("size", "auto");

    const r = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVEBG_API_KEY,
      },
      body: formData,
    });

    const buffer = await r.buffer();
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  });
}
