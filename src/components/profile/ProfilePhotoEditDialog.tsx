"use client";

import * as React from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Pencil, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cropImageToBlob } from "@/lib/cropImage";
import { useUpdateProfilePhoto } from "@/hooks/useProfile";

type ProfilePhotoEditDialogProps = {
  disabled?: boolean;
};

export function ProfilePhotoEditDialog({
  disabled,
}: ProfilePhotoEditDialogProps) {
  const { mutateAsync, isPending } = useUpdateProfilePhoto();

  const [open, setOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = React.useState<string | null>(
    null,
  );
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null,
  );

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  function resetState() {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setSelectedFileName(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function onSave() {
    if (!imageUrl || !croppedAreaPixels) return;

    const blob = await cropImageToBlob(imageUrl, croppedAreaPixels, {
      outputSize: 512,
      mimeType: "image/jpeg",
      quality: 0.92,
    });

    const file = new File([blob], "profile-photo.jpg", { type: blob.type });
    await mutateAsync(file);

    setOpen(false);
    resetState();
  }

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="icon-sm"
        disabled={disabled}
        className="absolute -right-1 -bottom-1 rounded-full shadow border"
        onClick={() => setOpen(true)}
        aria-label="Editar foto do perfil"
        title="Editar foto"
      >
        <Pencil className="size-4" />
      </Button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) resetState();
        }}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar foto de perfil</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex flex-col gap-1">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    if (!file) return;
                    if (!file.type.startsWith("image/")) return;

                    setSelectedFileName(file.name);

                    const nextUrl = URL.createObjectURL(file);
                    if (imageUrl) URL.revokeObjectURL(imageUrl);
                    setImageUrl(nextUrl);
                  }}
                />

                <Button
                  type="button"
                  variant="default"
                  onClick={() => inputRef.current?.click()}
                  disabled={disabled || isPending}
                >
                  <Upload className="size-4" />
                  {imageUrl ? "Trocar imagem" : "Selecionar imagem"}
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/20 overflow-hidden">
              <div className="relative w-full h-[420px] bg-black/80">
                {imageUrl ? (
                  <Cropper
                    image={imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(_, areaPixels) =>
                      setCroppedAreaPixels(areaPixels)
                    }
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-sm text-white/80">
                    Selecione uma imagem para recortar.
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 w-14">Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
                disabled={!imageUrl}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetState();
                setOpen(false);
              }}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={onSave}
              disabled={!imageUrl || !croppedAreaPixels || isPending}
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
