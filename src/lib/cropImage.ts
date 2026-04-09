import type { Area } from "react-easy-crop";

function createHtmlImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (e) => reject(e));
    image.crossOrigin = "anonymous";
    image.src = url;
  });
}

export async function cropImageToBlob(
  imageUrl: string,
  cropAreaPixels: Area,
  options?: { outputSize?: number; mimeType?: string; quality?: number },
): Promise<Blob> {
  const image = await createHtmlImage(imageUrl);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas_not_supported");

  const outputSize = options?.outputSize ?? 512;
  const mimeType = options?.mimeType ?? "image/jpeg";
  const quality = options?.quality ?? 0.92;

  canvas.width = outputSize;
  canvas.height = outputSize;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Draw the selected crop area into a square output canvas.
  ctx.drawImage(
    image,
    cropAreaPixels.x,
    cropAreaPixels.y,
    cropAreaPixels.width,
    cropAreaPixels.height,
    0,
    0,
    outputSize,
    outputSize,
  );

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("crop_failed"))),
      mimeType,
      quality,
    );
  });

  return blob;
}

