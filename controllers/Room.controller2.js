import { findRoomById, updateRoomById, deleteRoomById } from '../service/room.service.js';

export const getRoomById = async (request, response) => {
    try {
        const roomId = request.params.id;
        if (!roomId) {
            return response.status(400).json({
                message: "Please provide a valid room ID"
            });
        }

        const room = await findRoomById(roomId);
        if (!room) {
            return response.status(404).json({
                message: "Room not found"
            });
        }

        return response.status(200).json(room);
    } catch (error) {
        console.error("Error retrieving room by ID:", error);
        return response.status(500).json({
            message: "Internal server error"
        });
    }
}

export const updateRoom = async (request, response) => {
    try {
        const { id } = request.params;
        const { name, price } = request.body;
        if (!id || !name  || !price) {
            return response.status(400).json({
                message: "Please provide all required fields: id, name, roomtype, price"
            });
        }

        const updatedRoom = await updateRoomById(id, name, price);
        if (!updatedRoom) {
            return response.status(404).json({
                message: "Room not found"
            });
        }

        return response.status(200).json(updatedRoom);
    } catch (error) {
        console.error("Error updating room:", error);
        return response.status(500).json({
            message: "Internal server error"
        });
    }
}

export const deleteRoom = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                message: "Please provide a valid room ID"
            });
        }

        const deletedRoom = await deleteRoomById(id);
        if (!deletedRoom) {
            return response.status(404).json({
                message: "Room not found"
            });
        }

        return response.status(200).json({
            message: "Room deleted successfully",
            deletedRoom
        });
    } catch (error) {
        console.error("Error deleting room:", error);
        return response.status(500).json({
            message: "Internal server error"
        });
    }
}
