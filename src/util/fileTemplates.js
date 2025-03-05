// Template for controller file
const modelTemplate = (moduleName) => {
  return `
    const { Schema, model } = require("mongoose");
    const ObjectId = Schema.Types.ObjectId;

    const ${moduleName.toLowerCase()}Schema = new Schema(
    {
        
    },
    {
        timestamps: true,
    }
    );

    const ${moduleName} = model("${moduleName}", ${moduleName.toLowerCase()}Schema);

    module.exports = ${moduleName};
    `;
};

// Template for controller file
const controllerTemplate = (moduleName) => {
  return `
    const ${moduleName}Service = require("./${moduleName.toLowerCase()}.service");
    const sendResponse = require("../../../shared/sendResponse");
    const catchAsync = require("../../../shared/catchAsync");

    const create${moduleName} = catchAsync(async (req, res) => {
    const result = await ${moduleName}Service.create${moduleName}(req.user, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "${moduleName} created",
        data: result,
    });
    });

    const get${moduleName} = catchAsync(async (req, res) => {
    const result = await ${moduleName}Service.get${moduleName}(req.user, req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "${moduleName} retrieved",
        data: result,
    });
    });

    const getAll${moduleName}s = catchAsync(async (req, res) => {
    const result = await ${moduleName}Service.getAll${moduleName}s(req.user, req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "${moduleName}s retrieved",
        data: result,
    });
    });

    const update${moduleName} = catchAsync(async (req, res) => {
    const result = await ${moduleName}Service.update${moduleName}(req.user, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "${moduleName} updated",
        data: result,
    });
    });

    const delete${moduleName} = catchAsync(async (req, res) => {
    const result = await ${moduleName}Service.delete${moduleName}(req.user, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "${moduleName} deleted",
        data: result,
    });
    });

    const ${moduleName}Controller = {
    create${moduleName},
    get${moduleName},
    getAll${moduleName}s,
    update${moduleName},
    delete${moduleName},
    };

    module.exports = ${moduleName}Controller;
  `;
};

// Template for routes file
const routesTemplate = (moduleName) => {
  return `
    const express = require("express");
    const auth = require("../../middleware/auth");
    const config = require("../../../config");
    const ${moduleName}Controller = require("./${moduleName.toLowerCase()}.controller");

    const router = express.Router();

    
    router
        .post("/post-${moduleName.toLowerCase()}", auth(config.auth_level.user), ${moduleName}Controller.post${moduleName})
        .get("/get-${moduleName.toLowerCase()}", auth(config.auth_level.user), ${moduleName}Controller.get${moduleName})
        .get("/get-all-${moduleName.toLowerCase()}s", auth(config.auth_level.user), ${moduleName}Controller.getAll${moduleName}s)
        .patch("/update-${moduleName.toLowerCase()}", auth(config.auth_level.user), ${moduleName}Controller.getAll${moduleName}s)
        .delete("/delete-${moduleName.toLowerCase()}", auth(config.auth_level.user), ${moduleName}Controller.delete${moduleName});

    module.exports = router;
  `;
};

// Template for service file
const serviceTemplate = (moduleName) => {
  return `
    const ${moduleName} = require("./${moduleName.toLowerCase()}");

    const post${moduleName} = async (userdata, payload) => {
    // Add your logic here
    };

    const get${moduleName} = async (query) => {
    // Add your logic here
    };

    const getAll${moduleName}s = async (userdata, query) => {
    // Add your logic here
    };

    const update${moduleName} = async (userdata, payload) => {
    // Add your logic here
    };

    const delete${moduleName} = async (userdata, payload) => {
    // Add your logic here
    };

    const ${moduleName}Service = {
    post${moduleName},
    get${moduleName},
    getAll${moduleName}s,
    update${moduleName},
    delete${moduleName},
    };

    module.exports =  ${moduleName}Service ;  
  `;
};

module.exports = {
  modelTemplate,
  controllerTemplate,
  routesTemplate,
  serviceTemplate,
};
