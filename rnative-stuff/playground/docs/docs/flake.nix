{
  description = "Playground docs nix flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-24.05";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in {
    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = with pkgs; [
          d2
          mdbook
          mdbook-d2
        ];
      };
    };

    packages.${system} = {
      docs = pkgs.stdenv.mkDerivation {
        name = "playground-docs";
        buildInputs = with pkgs; [
          d2
          mdbook
          mdbook-d2
        ];
        phases = "installPhase";
        src = ./.;
        installPhase = ''
          cd $src
          mkdir -p $out
          mdbook build --dest-dir $out
        '';
      };
    };
  };
}
