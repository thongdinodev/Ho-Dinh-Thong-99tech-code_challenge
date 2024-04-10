import { RequestHandler } from "express";
import User from '../models/userModel';


export const createUser : RequestHandler = async (req, res, next) => {
    
    try {
        const input = req.body as {name: string, email: string, age: number, gender: string};

        const newUser = await User.create(input);

        res.status(201).json({
            message: "Created new User",
            data: newUser
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
};

export const GetAllUsers : RequestHandler = async (req, res, next) => {
    try {
        // 1A) Basic filtering
        const queryObj = {...req.query};
        const excludeFields = ['page', 'limit', 'sort', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

        let query = User.find(JSON.parse(queryStr));

        // 2) Sorting
        if (req.query.sort) {
            const sortBy = (req.query.sort as string).split(',').join(' ');
            query = query.sort(sortBy)
        } else {
            query.sort("-createdAt");
        }

        // 3) Limiting
        if (req.query.fields) {
            const limitFields = (req.query.fields as string).split(',').join(' ');
            query = query.select(limitFields);
        } else {
            query = query.select({});
        }

        // 4) Pagination
        const page: number = (req.query.page as any) * 1 || 1;
        const limit: number = (req.query.limit as any) * 1 || 20;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        
        const users = await query;

        res.status(200).json({
            status: "success",
            message: "Success get all users",
            results: users.length,
            data: users
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
};


export const updateUser : RequestHandler = async (req, res, next) => {
    const idSearch = req.params.id;

    try {
        const userUpdated = req.body as {name: string, email: string, age: number, gender: string};
        const user = await User.findByIdAndUpdate(idSearch, userUpdated, {
            new: true,
            runValidators: true
        });
    
        res.status(200).json({
            status: "success",
            message: "updated user with id " + idSearch,
            data: user
        });
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: `Can't find user with id ${idSearch}`
        });
    };
};

export const deleteUser : RequestHandler = async (req, res, next) => {
    const idSearch = req.params.id;

    try {
        const user = await User.findByIdAndDelete(idSearch);
    
        res.status(204).json({
            status: "success",
            message: "Deleted user with id " + idSearch,
        });
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: `Can't find user with id ${idSearch}`
        });
    };

};