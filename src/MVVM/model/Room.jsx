import React, { Component } from 'react';

class Room {
    constructor(id, hotelId, price, position, tellocation,facilities, images) {
        this.id = id;
       this.hotelId = hotelId;
        this.price = price;
        this.position = position;
        this.tellocation = tellocation;
        this.facilities = facilities;
        this.images = images;//array cu 3 imagini
    }
}

export default User;