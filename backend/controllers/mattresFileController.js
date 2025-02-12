import fs from "fs/promises";
import path from "path";

const dataFilePath = path.resolve("data/mattresses.json");

// Leer todos los colchones
const getAllMattresses = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const mattresses = JSON.parse(data);
    res.json(mattresses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al recuperar los colchones" });
  }
};

// Crear un colchón
const addMattress = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const mattresses = JSON.parse(data);

    const newMattress = { id: Date.now(), ...req.body };
    mattresses.push(newMattress);

    await fs.writeFile(dataFilePath, JSON.stringify(mattresses, null, 2), "utf8");
    res.status(201).json(newMattress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar el colchón" });
  }
};

// Leer un colchón por ID
const getMattressById = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const mattresses = JSON.parse(data);

    const mattress = mattresses.find((m) => m.id === parseInt(req.params.id));

    if (!mattress) {
      return res.status(404).json({ error: "Colchón no encontrado" });
    }

    res.json(mattress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al recuperar el colchón" });
  }
};

// Actualizar un colchón
const updateMattress = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const mattresses = JSON.parse(data);

    const mattressIndex = mattresses.findIndex((m) => m.id === parseInt(req.params.id));

    if (mattressIndex === -1) {
      return res.status(404).json({ error: "Colchón no encontrado" });
    }

    const updatedMattress = { ...mattresses[mattressIndex], ...req.body };
    mattresses[mattressIndex] = updatedMattress;

    await fs.writeFile(dataFilePath, JSON.stringify(mattresses, null, 2), "utf8");
    res.json(updatedMattress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el colchón" });
  }
};

// Eliminar un colchón
const deleteMattress = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const mattresses = JSON.parse(data);

    const mattressIndex = mattresses.findIndex((m) => m.id === parseInt(req.params.id));

    if (mattressIndex === -1) {
      return res.status(404).json({ error: "Colchón no encontrado" });
    }

    mattresses.splice(mattressIndex, 1);

    await fs.writeFile(dataFilePath, JSON.stringify(mattresses, null, 2), "utf8");
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el colchón" });
  }
};

export { getAllMattresses, addMattress, getMattressById, updateMattress, deleteMattress };
