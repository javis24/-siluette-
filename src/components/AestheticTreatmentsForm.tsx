import { useState, useEffect } from "react";
import axios from "axios";

const AestheticTreatmentsForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    cavitation: 0,
    radioFrequency: 0,
    lipoLaser: 0,
    vacuum: 0,
    gluteCups: 0,
    woodTherapy: 0,
    lymphaticDrainage: 0,
    detox: 0,
    mesotherapy: 0,
    passiveGym: 0,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/aesthetic-treatments?userId=${userId}`);
        if (response.data.length > 0) {
          setFormData(response.data[0]); // Asume que hay un solo registro por usuario
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/aesthetic-treatments",
        { ...formData, userId }, // Enviar userId correctamente
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Tratamiento registrado con éxito");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setMessage("Error al registrar el tratamiento");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Registrar Tratamiento Estético
      </h1>

      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[ // Lista de campos
          { label: "Cavitación", name: "cavitation" },
          { label: "Radiofrecuencia", name: "radioFrequency" },
          { label: "Lipoláser", name: "lipoLaser" },
          { label: "Vacuum", name: "vacuum" },
          { label: "Copas Glúteo", name: "gluteCups" },
          { label: "Maderoterapia", name: "woodTherapy" },
          { label: "Drenaje Linfático", name: "lymphaticDrainage" },
          { label: "Detox", name: "detox" },
          { label: "Mesoterapia", name: "mesotherapy" },
          { label: "Gimnasia Pasiva", name: "passiveGym" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-gray-700 font-semibold mb-2"
            >
              {field.label}
            </label>
            <input
              type="number"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-semibold"
        >
          Guardar Tratamiento
        </button>
      </form>
    </div>
  );
};

export default AestheticTreatmentsForm;
