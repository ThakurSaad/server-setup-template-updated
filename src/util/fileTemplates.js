// Template for controller file
const modelTemplate = (moduleName) => {
  const moduleNameLowerCase = moduleName.toLowerCase();

  return `
    const { Schema, model } = require("mongoose");
    const ObjectId = Schema.Types.ObjectId;

    const ${moduleNameLowerCase}Schema = new Schema(
    {
        
    },
    {
        timestamps: true,
    }
    );

    const ${moduleName} = model("${moduleName}", ${moduleNameLowerCase}Schema);

    module.exports = ${moduleName};
    `;
};

// Template for controller file
const controllerTemplate = (moduleName) => {
  const moduleNameLowerCase = moduleName.toLowerCase();

  return `
    const ${moduleName}Service = require("./${moduleNameLowerCase}.service");
    const sendResponse = require("../../../util/sendResponse");
    const catchAsync = require("../../../util/catchAsync");

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
  const moduleNameLowerCase = moduleName.toLowerCase();

  return `
    const express = require("express");
    const auth = require("../../middleware/auth");
    const config = require("../../../config");
    const ${moduleName}Controller = require("./${moduleNameLowerCase}.controller");

    const router = express.Router();
    
    router
        .post("/post-${moduleNameLowerCase}", auth(config.auth_level.user), ${moduleName}Controller.post${moduleName})
        .get("/get-${moduleNameLowerCase}", auth(config.auth_level.user), ${moduleName}Controller.get${moduleName})
        .get("/get-all-${moduleNameLowerCase}s", auth(config.auth_level.user), ${moduleName}Controller.getAll${moduleName}s)
        .patch("/update-${moduleNameLowerCase}", auth(config.auth_level.user), ${moduleName}Controller.getAll${moduleName}s)
        .delete("/delete-${moduleNameLowerCase}", auth(config.auth_level.user), ${moduleName}Controller.delete${moduleName});

    module.exports = router;
  `;
};

// Template for service file
const serviceTemplate = (moduleName) => {
  const moduleNameLowerCase = moduleName.toLowerCase();

  return `
    const { default: status } = require("http-status");  
    const ${moduleName} = require("./${moduleName}");
    const QueryBuilder = require("../../../builder/queryBuilder");
    const ApiError = require("../../../error/ApiError");
    const validateFields = require("../../../util/validateFields");

    const post${moduleName} = async (userData, payload) => {
    // Add your logic here
    };

    const get${moduleName} = async (userData, query) => {
        validateFields(query, ["${moduleNameLowerCase}Id"]);

        const ${moduleNameLowerCase} = await ${moduleName}.findOne({
        _id: query.${moduleNameLowerCase}Id,
        }).lean();

        if (!${moduleNameLowerCase})
        throw new ApiError(status.NOT_FOUND, "${moduleName} not found");

        return ${moduleNameLowerCase};
    };

    const getAll${moduleName}s = async (userData, query) => {
        const ${moduleNameLowerCase}Query = new QueryBuilder(
        ${moduleName}.find({}).lean(),
        query
        )
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();

        const [${moduleNameLowerCase}, meta] = await Promise.all([
        ${moduleNameLowerCase}Query.modelQuery,
        ${moduleNameLowerCase}Query.countTotal(),
        ]);

        return {
        meta,
        ${moduleNameLowerCase}s,
        };
    };

    const update${moduleName} = async (userData, payload) => {
    // Add your logic here
    };

    const delete${moduleName} = async (userData, payload) => {
        validateFields(payload, ["${moduleNameLowerCase}Id"]);

        const ${moduleNameLowerCase} = await ${moduleName}.deleteOne({
        _id: payload.${moduleNameLowerCase}Id,
        });

        if (!${moduleNameLowerCase}.deletedCount)
        throw new ApiError(status.NOT_FOUND, "${moduleName} not found");

        return ${moduleNameLowerCase};
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
