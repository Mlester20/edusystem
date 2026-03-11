import express from "express";
import { createAcademicYear, getCurrentAcademicYear, updateAcademicYear, deleteAcademicYear, getAllAcademicYears } from "../controllers/academicYear";
import { authorize, protect } from "../middleware/auth";

export const academicYearRouter = express.Router();

// Route to create a new academic year (Admin only)
academicYearRouter
    .route("/create")
    .post(protect, authorize(['admin']), createAcademicYear)

//route to get all academic years
academicYearRouter
    .route("/")
    .get(protect, authorize(['admin']), getAllAcademicYears)        

//route to get current academic year
academicYearRouter
    .route("/current")
    .get(protect, authorize(['admin']), getCurrentAcademicYear)

// Route to update an academic year (Admin only)
academicYearRouter
    .route("/update/:id")
    .patch(protect, authorize(['admin']), updateAcademicYear)

// Route to delete an academic year (Admin only)
academicYearRouter
    .route("/delete/:id")
    .delete(protect, authorize(['admin']), deleteAcademicYear)

export default academicYearRouter;