import { Router } from 'express';
import UserModel from '../dao/models/user.model.js';
import mongoose from 'mongoose';

const router = Router();


router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios.' });
    }
});


router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'El ID proporcionado no es un ObjectId válido.' });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario.', details: error.message });
    }
});


router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'El ID proporcionado no es un ObjectId válido.' });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado para actualizar.' });
        }

        res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario.', details: error.message });
    }
});


router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'El ID proporcionado no es un ObjectId válido.' });
        }

        
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado para eliminar.' });
        }

        res.status(200).json({ message: 'Usuario eliminado con éxito', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario.', details: error.message });
    }
});


router.post('/', async (req, res) => {
    const newUser = req.body;
    
    try {
        const result = await UserModel.create(newUser);
        res.status(201).json({ message: 'Usuario creado con éxito', user: result });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario.' });
    }
});

export default router;