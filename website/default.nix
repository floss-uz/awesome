{
  pkgs ? let
    lock = (builtins.fromJSON (builtins.readFile ./flake.lock)).nodes.nixpkgs.locked;
    nixpkgs = fetchTarball {
      url = "https://github.com/nixos/nixpkgs/archive/${lock.rev}.tar.gz";
      sha256 = lock.narHash;
    };
  in
    import nixpkgs {overlays = [];},
  ...
}: let
  manifest = pkgs.lib.importJSON ./package.json;

  exec = pkgs.writeShellScript "${manifest.name}-start.sh" ''
    # Change working directory to script
    cd "$(dirname "$0")/../lib"

    ${pkgs.lib.getExe pkgs.nodejs} ./server.js
  '';
in
  # pkgs.stdenv.mkDerivation {
  pkgs.buildNpmPackage {
    pname = manifest.name;
    version = manifest.version;

    src = ./.;
    npmDepsHash = "sha256-lh+rANtuft6fGSAn56D4VCcr8pfhVL/s1Hw4rHpXNSo=";

    installPhase = ''
      # Copy all content
      cp -r ./dist $out
    '';

    nativeBuildInputs = with pkgs; [
      # Typescript
      nodejs
      pnpm
      corepack

      # Hail the Nix
      nixd
      statix
      alejandra
    ];

    buildInputs = with pkgs; [
      openssl
      vips
    ];

    meta = with pkgs.lib; {
      homepage = "https://awesome.floss.uz";
      mainProgram = "${manifest.name}-start";
      description = "Awesome for Floss Community";
      license = with licenses; [cc-by-40];
      platforms = with platforms; linux ++ darwin;
      maintainers = with maintainers; [orzklv];
    };
  }
