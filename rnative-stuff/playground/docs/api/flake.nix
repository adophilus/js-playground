{
    description = "BetaLyfe nix flake for API docs";
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
                    nodejs
                    nodePackages.pnpm
                ];
            };
        };

        packages.${system} = {
            docs = pkgs.stdenv.mkDerivation {
                name = "betalyfe-api-docs";
                buildInputs = with pkgs; [
                    nodejs
                    nodePackages.pnpm
                    cacert
                ];
                src = ./.;
                buildPhase = ''
                    cp -r $src/* .
                    pnpm install
                    pnpm run build --base /docs/api
                '';
                installPhase = ''
                    mkdir -p $out
                    cp -r dist/* $out
                '';
            };
        };
    };
}