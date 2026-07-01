# Native environment for this project (NixOS).
# Enter: nix-shell  |  Run one-off: nix-shell --run "python process.py ingest"
{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  packages = [
    (pkgs.python312.withPackages (p: [
      p.numpy
      p.opencv4
      p.pillow
      p.pytesseract
      p.onnxruntime
    ]))
    pkgs.tesseract4
  ];
}
