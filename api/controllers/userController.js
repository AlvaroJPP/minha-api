import { createUser, getUserByEmail, getUserById, updateUser, deleteUser, getAllUsers } from '../models/userModel.js';

export const createUserController = async (req, res) => {
    try {
        const { name, email, password, date, redesocial } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        const newUser = await createUser({
            name,
            email,
            password,
            date,
            redesocial
        });

        return res.status(201).json({ message: `Usuário ${newUser.name} criado com sucesso!` });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ message: "Erro ao criar usuário." });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, date, redesocial } = req.body;

       
        const existingUser = await getUserById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }


        const updatedUser = await updateUser(id, { name, email, password, date, redesocial });

        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers(req.query);
        res.status(200).json(users);

    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Erro ao buscar usuários." });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }
        res.status(200).json(user);

    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        res.status(500).json({ message: "Erro ao buscar usuário." });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        await deleteUser(req.params.id);
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });

    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ message: "Erro ao deletar usuário." });
    }
};
