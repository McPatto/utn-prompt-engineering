import Mattress from "../models/mattressModel.js"; // Asegúrate de ajustar la ruta según la ubicación del modelo

// Leer todos los colchones
const getAllMattresses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [mattresses, total] = await Promise.all([
      Mattress.find()
        .skip(skip)
        .limit(limit),
      Mattress.countDocuments()
    ]);

    res.json({
      mattresses,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al recuperar los colchones" });
  }
};

// Crear un colchón
const addMattress = async (req, res) => {
  try {
    const newMattress = new Mattress(req.body);
    const savedMattress = await newMattress.save();
    res.status(201).json(savedMattress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar el colchón" });
  }
};

// Leer un colchón por ID
const getMattressById = async (req, res) => {
  try {
    const mattress = await Mattress.findById(req.params.id);

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
    const updatedMattress = await Mattress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMattress) {
      return res.status(404).json({ error: "Colchón no encontrado" });
    }

    res.json(updatedMattress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el colchón" });
  }
};

// Eliminar un colchón
const deleteMattress = async (req, res) => {
  try {
    const deletedMattress = await Mattress.findByIdAndDelete(req.params.id);

    if (!deletedMattress) {
      return res.status(404).json({ error: "Colchón no encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el colchón" });
  }
};

// Agregar este nuevo método
const deleteManyMattresses = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Se requiere un array de IDs válido" });
    }

    const result = await Mattress.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No se encontraron colchones para eliminar" });
    }

    res.status(200).json({ 
      message: `${result.deletedCount} colchones eliminados exitosamente` 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar los colchones" });
  }
};

export { getAllMattresses, addMattress, getMattressById, updateMattress, deleteMattress, deleteManyMattresses };
