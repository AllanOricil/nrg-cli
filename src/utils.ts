import * as path from "path";
import * as fs from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { packageDirectorySync } from "pkg-dir";
import globalModules from "global-modules";

function getPlopfileFilepath(): string {
  const packageDirectory = packageDirectorySync();

  return path.resolve(
    packageDirectory
      ? path.join(packageDirectory, "node_modules")
      : path.join(globalModules, "@allanoricil/nrg-cli/node_modules"),
    "@allanoricil/nrg-generator/plopfile.js",
  );
}

interface PackageJson {
  name: string;
  version: string;
  description?: string;
  main?: string;
  scripts?: { [key: string]: string };
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  [key: string]: unknown;
}

function getPackageJson(): PackageJson {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const packageJsonPath = path.resolve(__dirname, "../package.json");
  const packageJson: PackageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf-8"),
  );
  return packageJson;
}

function getCLIInfo(): string {
  const packageJson = getPackageJson();
  const version = packageJson.version;

  const logo = `
                      :     ********                          
                      :+******##*******                      
                    ****-**#%%%%%%%%#*******                  
                ******##-#%%%%%%%%%%%%%#*******              
            ******##%%%%#:*%%%%%%%%%%%%%%%%#******           
        ******##%%%%%%%%%#:+%%%%%%%%%%%%%%%%%%%##*#*##       
    *******#%%%%%%%%%%%%%%*:-%%%%%%%%%%%%%%%%%%%%%%#######   
  ******#%%%%%%%%%%%%%%%%%%%*:-#%%%%%%%%%%%%%%%%%%%%%%%#######
  **##%%%%%%%%%%%%%%%%%%%%%%%*::*%%%%%%%%%%%%%%%%%%%%%%%%%%###
  **#%%%%%%%%%%%%+*%%%%%%%%%%%+::+%%%%%%%%%%%%%%%%%%%%%%%%%%##
  **#%%%%%%%%%%%%%-::=+#%%%%%%%=::=%%%%%%%%%%%%%%%%%%%%%%%%%##
  **#%%%%%%%%%%%%%%+:::::-+*#%%%=::-%%%%%%%%%%%%%%%%%%%%%%%%##
  **#%%%%%%%%%%%%%%%*:::::::::=+#-:::#%%%%%%%%%%%%%%%%%%%%%%##
  **#%%%%%%%%%%%%%%%%#-:::::::::::::::*%%%%%%%%%%%%%%%%%%@@%##
  **#%%%%%%%%%%%%%%%%%%=:::::::::::::::=%%%%%%%%%%%%%%%@@@@%##
  **#%%%%%%%%%%%%%%%%%%%*:::::::::::::::-%%%%%%%%%%%%@%@@@@%##
  **#%%%%%%%%%%%%%%%%%%%%#-::::::++-:::::-#%%%%%%%%%@@@@@@@%##
  **#%%%%%%%%%%%%%%%%%%%%%%=:::::=%%%#*+=-:*%%%%%@@@@@@@@@@%##
  **#%%%%%%%%%%%%%%%%%%%%%%%*:::::+%%%%%%%%#%%%%@@@@@@@@@@@%##
  **#%%%%%%%%%%%%%%%%%%%%%%%%#-::::*%%%%%%%%%@@@%@@@@@@@@@@%##
  **#%%%%%%%%%%%%%%%%%%%%%%%%%%-::::#%%%%%%%%@@@@@@@@@@@@@@%##
  **#%%%%%%%%%%%%%%%%%%%%%%%%%%%+::::#%%%%%@@@@@@@@@@@@@@@@%##
  **#%%%%%%%%%%%%%%%%%%%%%%%%%%%%#:::-%%%@@@@@@@@@@@@@@@@@@%##
  **#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%-::-%%@@@@@@@@@@@@@@@@@@%##
  **#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=::=%@@@@@@@@@@@@@@@@@%%##
  *****##%%%%%%%%%%%%%%%%%%%%%%%%%%%@*::+@@@@@@@@@@@@@%%######
    ******##%%%%%%%%%%%%%%%%%%%%@@@@@#-:*@@@@@@@@%%%######   
        ****###%%%%%%%%%%%%%%%@@@@@@@@%=:#@@@%%%######       
            #######%%%%%%%%%%@@@@@@@@@@@*-#%######           
                #######%%%@%@@@@@@@@@%%%#*-*##               
                    #######%%%@@@@%%%######=:                 
                        #######%%#######     :                
                            ########                          
  `;

  const authorName = "Allan Oricil";
  const thankYouMessage = `
  Thank you for installing the nrg CLI! 🚀

  You are now ready to power up your projects with ease. For help and guidance, run:

    nrg --help

  Happy coding! 🎉
  `;

  const message = `Author:  ${chalk.bold(authorName)}\nVersion: ${chalk.yellow(`${version}`)}\n${chalk.green(thankYouMessage)}`;
  return `${chalk.red(logo)}\n${message}\n`;
}

export { getPlopfileFilepath, getPackageJson, getCLIInfo };
