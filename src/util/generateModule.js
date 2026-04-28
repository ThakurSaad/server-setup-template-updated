const fs = require("fs");
const path = require("path");
const {
  modelTemplate,
  controllerTemplate,
  routesTemplate,
  serviceTemplate,
} = require("./fileTemplates");

// Function to create a new module
const generateModule = (moduleName) => {
  const dirPath = path.join(__dirname, moduleName);

  // Check if the directory exists
  if (!fs.existsSync(dirPath)) {
    // Create the module directory
    fs.mkdirSync(dirPath.toLowerCase(), { recursive: true });

    // model
    fs.writeFileSync(
      path.join(dirPath, `${moduleName}.js`),
      `${modelTemplate(moduleName)}`
    );

    // controller
    fs.writeFileSync(
      path.join(dirPath, `${moduleName.toLowerCase()}.controller.js`),
      `${controllerTemplate(moduleName)}`
    );

    // routes
    fs.writeFileSync(
      path.join(dirPath, `${moduleName.toLowerCase()}.routes.js`),
      `${routesTemplate(moduleName)}`
    );

    // service
    fs.writeFileSync(
      path.join(dirPath, `${moduleName.toLowerCase()}.service.js`),
      `${serviceTemplate(moduleName)}`
    );

    console.log(`✅ ${moduleName} module files created successfully!`);
  } else {
    console.log(`🚫 ${moduleName} module already exists.`);
  }
};

// Specify the module name
const moduleName = "Test";
generateModule(moduleName);
