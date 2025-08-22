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
  # Manifest data
  manifest = pkgs.lib.importJSON ./package.json;

  # All source codes
  source = ./.;
in
  # pkgs.stdenv.mkDerivation {
  pkgs.stdenv.mkDerivation {
    pname = manifest.name;
    version = manifest.version;

    src = source;

    buildPhase = ''
      pnpm build
    '';

    installPhase = ''
      # Copy all content
      cp -r ./dist $out
    '';

    nativeBuildInputs = with pkgs; [
      # Typescript
      nodejs
      pnpm.configHook

      # Hail the Nix
      nixd
      statix
      alejandra
    ];

    buildInputs = with pkgs; [
      openssl
      vips
    ];

    pnpmDeps = pkgs.pnpm.fetchDeps {
      pname = manifest.name;
      version = manifest.version;
      src = source;
      hash = "sha256-q/yLT602liKboo1KYwkzhdWe61SLo/MEoLmrE3xvaAo=";
    };

    meta = with pkgs.lib; {
      homepage = "https://awesome.floss.uz";
      mainProgram = "${manifest.name}-start";
      description = "Awesome for Floss Community";
      license = with licenses; [cc-by-40];
      platforms = with platforms; linux ++ darwin;
      maintainers = with maintainers; [orzklv];
    };
  }
