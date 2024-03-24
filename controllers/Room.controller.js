import { createRoom, createRoomType, dataBaseCall,  filteredRoom,   getAllRooms,roomTypeDataBaseCall} from '../service/room.service.js';

/*
roomtype function is used to register a roomtype 
* it also saves the room with an id that fits to the specified room type
*/ 

export const roomtype=async(request, response)=>{
  try {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({
        message: "Please provide a name"
      });
    }
    const existingRoomtype= await roomTypeDataBaseCall(name)
    if(existingRoomtype){
      response.status(200).json({message: "RoomType already exists"});  
    }
   const roomtype = await createRoomType(name)
   return response.status(201).json({ message: "RoomType created successfully", room: roomtype });
  } catch (error) {
    response.status(400).json({ message: error.message });
    console.log(error);
  }
}
/**
 * this is used to create a new room
 * checks for empty fields 
 * checks if the room and id already exists
 */
export const Rooms= async(request, response)=>{
  try {
    const {name, roomtype,description,price} = request.body;
    if ( !name || !roomtype||!description||!price){
      return response.status(400).json({
        message: "Please complete the fields"
      })
    }
    const roomTypeId= await roomTypeDataBaseCall(roomtype)
    const roomType =roomTypeId._id
    const existingRoom = await dataBaseCall(name)
    if (!existingRoom) {
     const newRoom= await createRoom(name,roomType,description,price)
   return response.status(201).json({ message: "Room created successfully", room: newRoom })
    }else{
      return response.status(400).json({
        message: "Room already exists"
      })
    }
    
  } catch (error) {
    response.status(400).json({ message: error.message });
    console.log(error)
  }
}
export const getRooms= async(request, response)=>{
    try {
        const allRooms= await getAllRooms()
        return response.status(200).json(allRooms);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "Internal server error"
        })
    }
}
export const searchRooms=async(request, response)=>{
    try{
 const filteredRooms = await filteredRoom(request)
 return response.status(200).json(filteredRooms);
}catch(error){
console.log("Error retrieving rooms",error)
    return response.status(500).json({
        message: "Internal server error"
    })
};
}