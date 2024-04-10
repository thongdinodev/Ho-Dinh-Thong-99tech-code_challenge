"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const mongoDBUrl = 'mongodb://localhost:27017/testUserDB';
mongoose_1.default.connect(mongoDBUrl).then(() => {
    console.log('Success connect to monogoDB');
}).catch((err) => {
    console.log(err);
});
app.use((0, body_parser_1.json)());
app.use('/api/users', userRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000, () => {
    console.log('Server is running on port: 3000');
});
