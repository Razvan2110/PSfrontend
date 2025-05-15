import { useState, useEffect } from 'react';
import{
getAllRooms,
getRoomById,
createRoom,
updateRoom,
deleteRoom
} from '../model/repository/RoomRepository';


const useRoomViewModel = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch all rooms
    const fetchAllRooms = async () => {
        setLoading(true);
        try {
            const response = await getAllRooms();
            setRooms(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch room by ID
    const fetchRoomById = async (id) => {
        setLoading(true);
        try {
            const response = await getRoomById(id);
            return response.data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add room
    const addRoom = async (room) => {
        setLoading(true);
        try {
            const response = await createRoom(room);
            setRooms([...rooms, response.data]);
        } catch (err) {
            setError('Failed to add room');
        } finally {
            setLoading(false);
        }
    };

    // Update room
    const modifyRoom = async (id, updatedRoom) => {
        setLoading(true);
        try {
            const response = await updateRoom(id, updatedRoom);
            setRooms(rooms.map((room) => (room.id === id ? response.data : room)));
        } catch (err) {
            setError('Failed to update room');
        } finally {
            setLoading(false);
        }
    };

    // Delete room
    const removeRoom = async (id) => {
        setLoading(true);
        try {
            await deleteRoom(id);
            setRooms(rooms.filter((room) => room.id !== id));
        } catch (err) {
            setError('Failed to delete room');
        } finally {
            setLoading(false);
        }
    };

    return {
        rooms,
        error,
        loading,
        fetchAllRooms,
        fetchRoomById,
        addRoom,
        modifyRoom,
        removeRoom
    };
};

export default useRoomViewModel;