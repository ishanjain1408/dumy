import { Request, Response } from 'express';
import { db } from '../config/db';
import { Note } from '../models/noteModel';

export const getNotes = (req: Request, res: Response) => {
    db.query('SELECT * FROM notes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const createNote = (req: Request, res: Response) => {
    const { title, content } = req.body;
    const newNote: Note = { title, content };
    db.query('INSERT INTO notes SET ?', newNote, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Note created successfully' });
    });
};