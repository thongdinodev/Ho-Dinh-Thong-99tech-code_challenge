"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.GetAllUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = async (req, res, next) => {
    try {
        const input = req.body;
        const newUser = await userModel_1.default.create(input);
        res.status(201).json({
            message: "Created new User",
            data: newUser
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};
exports.createUser = createUser;
const GetAllUsers = async (req, res, next) => {
    try {
        // 1A) Basic filtering
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'limit', 'sort', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);
        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let query = userModel_1.default.find(JSON.parse(queryStr));
        // 2) Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }
        else {
            query.sort("-createdAt");
        }
        // 3) Limiting
        if (req.query.fields) {
            const limitFields = req.query.fields.split(',').join(' ');
            query = query.select(limitFields);
        }
        else {
            query = query.select({});
        }
        // 4) Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 20;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        const users = await query;
        res.status(200).json({
            status: "success",
            message: "Success get all users",
            results: users.length,
            data: users
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
};
exports.GetAllUsers = GetAllUsers;
const updateUser = async (req, res, next) => {
    const idSearch = req.params.id;
    try {
        const userUpdated = req.body;
        const user = await userModel_1.default.findByIdAndUpdate(idSearch, userUpdated, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            message: "updated user with id " + idSearch,
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            error: `Can't find user with id ${idSearch}`
        });
    }
    ;
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    const idSearch = req.params.id;
    try {
        const user = await userModel_1.default.findByIdAndDelete(idSearch);
        res.status(204).json({
            status: "success",
            message: "Deleted user with id " + idSearch,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            error: `Can't find user with id ${idSearch}`
        });
    }
    ;
};
exports.deleteUser = deleteUser;
