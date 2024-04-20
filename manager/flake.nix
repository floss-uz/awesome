{
  description = "Awesome Uz list Manager";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.default = pkgs.mkShell ({
        buildInputs = with pkgs; [
          ghc
          cabal-install
          haskell-language-server
          haskellPackages.hls-cabal-plugin
          haskellPackages.hls-cabal-fmt-plugin
          haskellPackages.hls-eval-plugin
          haskellPackages.cabal-fmt
          haskellPackages.fourmolu
          haskellPackages.hlint

          libz
        ];
      });
    }
  );
}
