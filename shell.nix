 with import <nixpkgs> {}; {
   pyEnv = stdenv.mkDerivation {
     name = "py";
     buildInputs = [ stdenv gitFull nginx 
                     nodejs nodePackages.mocha nodePackages.phantomjs php56 ];
     LD_LIBRARY_PATH="${exempi}/lib";
     shellHook = ''
       echo -n "Meow"
     ''
     ;
   };
 }
