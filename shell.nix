 with import <nixpkgs> {}; {
   pyEnv = stdenv.mkDerivation {
     name = "py";
     buildInputs = [ stdenv nodejs nodePackages.mocha nodePackages.phantomjs gitFull php56 ];
     LD_LIBRARY_PATH="${exempi}/lib";
     shellHook = ''
       echo -n "Meow"
     ''
     ;
   };
 }
