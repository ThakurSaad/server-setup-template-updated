import fs from "fs";
import path from "path";
import {
  modelTemplate,
  controllerTemplate,
  routesTemplate,
  serviceTemplate,
} from "./fileTemplates";

const generateModule = (moduleName: string): void => {
  const moduleFolder = moduleName.toLowerCase();
  const dirPath = path.join(__dirname, moduleFolder);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });

    fs.writeFileSync(
      path.join(dirPath, `${moduleName}.ts`),
      modelTemplate(moduleName),
    );

    fs.writeFileSync(
      path.join(dirPath, `${moduleFolder}.controller.ts`),
      controllerTemplate(moduleName),
    );

    fs.writeFileSync(
      path.join(dirPath, `${moduleFolder}.routes.ts`),
      routesTemplate(moduleName),
    );

    fs.writeFileSync(
      path.join(dirPath, `${moduleFolder}.service.ts`),
      serviceTemplate(moduleName),
    );

    console.log(`✅ ${moduleName} module files created successfully!`);
  } else {
    console.log(`🚫 ${moduleName} module already exists.`);
  }
};

const moduleName = "Test";

generateModule(moduleName);
