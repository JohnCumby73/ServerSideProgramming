const express = require("express");
const bergRouter = express.Router ();


const {bergSplit, createBerg} = require ("../controller/berg.controller.js");

bergRouter.put ('/split/bergId=:bergId', bergSplit);
bergRouter.post ('/', createBerg);

module.exports = bergRouter;

