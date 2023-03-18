import express from "express";
import { findById, findAll, save, edit, deleteById, getPaginated } from "../controllers/user.js"

const userAPI = express.Router()

userAPI.get("/:id", findById);
userAPI.get("/", findAll);
userAPI.post("/", save);
userAPI.put('/:id', edit);
userAPI.delete('/:id', deleteById);
userAPI.get('/paginated', getPaginated);

export default userAPI;