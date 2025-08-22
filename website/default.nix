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
      nodejs
      pnpm.configHook
    ];

    buildInputs = with pkgs; [
      openssl
      vips
    ];

    pnpmDeps = pkgs.pnpm.fetchDeps {
      pname = manifest.name;
      version = manifest.version;
      src = source;
      hash = "sha256-DC3N2ZQElu6Tzi6HLbV0z2sES33u2SgQL/lEu/KKhHc=";
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
