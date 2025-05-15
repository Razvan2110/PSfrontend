import React, { useEffect, useState } from 'react';
import useRoomViewModel from '../../MVVM/viewModel/RoomViewModel';

const initialRoom = {
    hotelId: '',
    price: '',
    position: '',
    location: '',
    facilities: '',
};

const PageAngajat = () => {
    const {
        rooms,
        error,
        loading,
        fetchAllRooms,
        addRoom,
        modifyRoom,
        removeRoom
    } = useRoomViewModel();

    const [newRoom, setNewRoom] = useState(initialRoom);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        fetchAllRooms();
    }, []);

    const handleAddRoom = async () => {
        await addRoom(newRoom);
        setNewRoom(initialRoom);
    };

    const handleUpdateRoom = async () => {
        if (selectedRoom) {
            const { images, ...roomData } = selectedRoom;
            await modifyRoom(selectedRoom.id, roomData);
            setSelectedRoom(null);
        }
    };

    const handleDeleteRoom = async (id) => {
        await removeRoom(id);
    };

    return (
        <div>
            <h1>Employee Page - Manage Rooms</h1>
            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hotel ID</th>
                        <th>Price</th>
                        <th>Position</th>
                        <th>Location</th>
                        <th>Facilities</th>
                        <th>Images</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.hotelId}</td>
                            <td>{room.price}</td>
                            <td>{room.position}</td>
                            <td>{room.location}</td>
                            <td>{room.facilities}</td>
                            <td>
                                {Array.isArray(room.images) && room.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img.imageUrl.startsWith('http') ? img.imageUrl : `http://localhost:8081/${img.imageUrl}`}
                                        alt="room"
                                        width={50}
                                    />
                                ))}
                            </td>
                            <td>
                                <button onClick={() => setSelectedRoom({
                                    hotelId: room.hotelId ?? '',
                                    price: room.price ?? '',
                                    position: room.position ?? '',
                                    location: room.location ?? '',
                                    facilities: room.facilities ?? '',
                                    id: room.id
                                })}>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{selectedRoom ? 'Edit Room' : 'Add New Room'}</h2>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    selectedRoom ? handleUpdateRoom() : handleAddRoom();
                }}
            >
                <div>
                    <label>Hotel ID:</label>
                    <input
                        type="text"
                        value={selectedRoom ? selectedRoom.hotelId : newRoom.hotelId}
                        onChange={e =>
                            selectedRoom
                                ? setSelectedRoom({ ...selectedRoom, hotelId: e.target.value })
                                : setNewRoom({ ...newRoom, hotelId: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={selectedRoom ? selectedRoom.price : newRoom.price}
                        onChange={e =>
                            selectedRoom
                                ? setSelectedRoom({ ...selectedRoom, price: e.target.value })
                                : setNewRoom({ ...newRoom, price: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        value={selectedRoom ? selectedRoom.position : newRoom.position}
                        onChange={e =>
                            selectedRoom
                                ? setSelectedRoom({ ...selectedRoom, position: e.target.value })
                                : setNewRoom({ ...newRoom, position: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={selectedRoom ? selectedRoom.location : newRoom.location}
                        onChange={e =>
                            selectedRoom
                                ? setSelectedRoom({ ...selectedRoom, location: e.target.value })
                                : setNewRoom({ ...newRoom, location: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Facilities:</label>
                    <input
                        type="text"
                        value={selectedRoom ? selectedRoom.facilities : newRoom.facilities}
                        onChange={e =>
                            selectedRoom
                                ? setSelectedRoom({ ...selectedRoom, facilities: e.target.value })
                                : setNewRoom({ ...newRoom, facilities: e.target.value })
                        }
                        required
                    />
                </div>

                <div>
                    <button type="submit">
                        {selectedRoom ? 'Update Room' : 'Add Room'}
                    </button>
                    {selectedRoom && (
                        <button type="button" onClick={() => setSelectedRoom(null)}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PageAngajat;