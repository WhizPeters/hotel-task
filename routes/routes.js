import express from 'express';
import { Rooms, getRooms, searchRooms, roomtype } from '../controllers/Room.controller.js';
import { getRoomById, updateRoom, deleteRoom } from '../controllers/Room.controller2.js';
import { adminSignup, adminLogin,forgotPasswordAdmin,deleteuser} from '../controllers/admin.controller.js';
import { signup, login,forgotPassword,deleteUsers } from '../controllers/user.controller.js';
import { cookiesVerifyAdmin, cookiesVerifyUser  } from '../middleware/cookiejwt.js';

const router = express.Router();


// User routes
router.post('/api/v1/signup', signup); // User signup
router.post('/api/v1/login', login); // User login
router.patch('/api/v1/forgotpassword', forgotPassword); // User password reset
router.delete('/api/v1/deleteuser',cookiesVerifyUser,deleteUsers)

// Public routes
router.get('/api/v1/rooms-types', cookiesVerifyUser , getRooms); // Get all room types
router.get('/api/v1/rooms', cookiesVerifyUser , searchRooms); // Search rooms


// Admin routes
router.post('/api/v1/admin/signup', adminSignup); // Admin signup
router.post('/api/v1/admin/login', adminLogin); // Admin login
router.patch('/api/v1/admin/forgotpassword', forgotPasswordAdmin); // Admin forgot password
router.delete('/api/v1/admin/deleteuser',cookiesVerifyAdmin,deleteuser)  // Admin delete user

// Protected routes (require authentication)
router.post('/api/v1/rooms-types', cookiesVerifyAdmin, roomtype); // Create a new room type
router.post('/api/v1/rooms', cookiesVerifyAdmin, Rooms); // Create a new room
router.get('/api/v1/rooms/:id',cookiesVerifyAdmin, getRoomById); // Get room by ID
router.patch('/api/v1/rooms/:id', cookiesVerifyAdmin, updateRoom); // Update room by ID
router.delete('/api/v1/rooms/:id', cookiesVerifyAdmin, deleteRoom); // Delete room by ID

export default router;
