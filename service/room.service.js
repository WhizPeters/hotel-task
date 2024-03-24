import room from '../model/Room.js';
import Roomtypes from '../model/Roomtype.js';

// Function to create a new room type
export const createRoomType = async (name) => {
    try {
        const newRoomtype = new Roomtypes({
            name,
        });
        await newRoomtype.save();
    } catch (error) {
        console.log("Error creating room type:", error);
        throw error;
    }
}

// Function to find a room by name
export const dataBaseCall = async (name) => {
    try {
        const result = await room.findOne({ name });
        return result;
    } catch (error) {
        throw error;
    }
}

export const roomTypeDataBaseCall= async (name) => {
    try{
    const result = await Roomtypes.findOne({ name});
    return result
    }catch(error){
    }

};

// Function to create a new room
export const createRoom = async (name, roomtype, description, price) => {
    try {
        const newRoom = new room({
            name,
            roomtype,
            description,
            price,
        });
        await newRoom.save();
    } catch (error) {
        throw error;
    }
};

// Function to get all rooms
export const getAllRooms = async () => {
    try {
        const result = await Roomtypes.find();
        return result;
    } catch (error) {
        throw error;
    }
}

// Function to filter rooms based on search criteria
export const filteredRoom = async (request) => {
    try {
        let filters = {};
        if (request.query.search) {
            filters.name = { $regex: new RegExp(request.query.search, "i") };
        }
        if (request.query.roomtype) {
            filters.name = { $regex: new RegExp(request.query.roomtype, "i") };
        }
        if (request.query.minprice || request.query.maxprice) {
            filters.price = {};
            if (request.query.minprice) {
                filters.price.$gte = parseInt(request.query.minprice);
            }
            if (request.query.maxprice) {
                filters.price.$lte = parseInt(request.query.maxprice);
            }
        }
        const filteredRooms = await room.find(filters);
        return filteredRooms;
    } catch (error) {
        throw error;
    }
}

// Function to find a room by ID
export const findRoomById = async (roomId) => {
    try {
        const result = await room.findById(roomId);
        return result;
    } catch (error) {
        throw error;
    }
}

// Function to update a room by ID
export const updateRoomById = async (id, name,  price) => {
    try {
        const updatedRoom = await room.findOneAndUpdate({ _id: id }, { name, price }, { new: true });
        return updatedRoom;
    } catch (error) {
        throw error;
    }
}

// Function to delete a room by ID
export const deleteRoomById = async (id) => {
    try {
        const deletedRoom = await room.findByIdAndDelete(id);
        return deletedRoom;
    } catch (error) {
        throw error;
    }
}

