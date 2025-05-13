import React, { Component } from 'react';

class User {
    constructor(id, nume, prenume, email, telefon, role) {
        this.id = id;
        this.nume = nume;
        this.prenume = prenume;
        this.telefon = telefon;
        this.email = email;
        this.role = role;
    }
}

export default User;