import { useState, useEffect } from "react";
import axios from "axios";

const HealthMetricsForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    weight: "",
    fatPercentage: "",
    muscleKg: "",
    bodyWater: "",
    phy: "",
    muscle: "",
    metabolicAge: "",
    heartRate: "",
    boneKg: "",
    visceralFat: "",
    bmi: "",
    hip: "",
    arms: "",
    thighs: "",
    calves: "",
    chest: "",
    waist: "",
    abdomen: "",
    kcla: "",
    userId: userId || "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing health metrics
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtén el token si es necesario
        const response = await axios.get(`/api/health-metrics?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.length > 0) {
          setFormData(response.data[0]); // Cargar la primera métrica existente
        }
      } catch (error) {
        console.error("Error fetching health metrics:", error);
        setMessage("No se encontraron métricas existentes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      if (formData.id) {
        // Actualizar métrica existente
        const response = await axios.put(`/api/health-metrics/${formData.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("Métrica de salud actualizada con éxito");
        console.log(response.data);
      } else {
        // Crear nueva métrica
        const response = await axios.post("/api/health-metrics", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("Métrica de salud registrada con éxito");
        console.log(response.data);
  
        // Actualiza el ID en el estado para futuras actualizaciones
        setFormData({ ...formData, id: response.data.metric.id });
      }
    } catch (error) {
      setMessage("Error al guardar la métrica de salud");
      console.error(error);
    }
  };
  
  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Registrar Métricas de Salud
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
        className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          { label: "Peso (kg)", name: "weight" },
          { label: "Porcentaje de Grasa (%)", name: "fatPercentage" },
          { label: "Músculo (kg)", name: "muscleKg" },
          { label: "Agua Corporal (%)", name: "bodyWater" },
          { label: "PHY", name: "phy" },
          { label: "Músculo (kg)", name: "muscle" },
          { label: "Edad Metabólica", name: "metabolicAge" },
          { label: "Frecuencia Cardiaca", name: "heartRate" },
          { label: "Huesos (kg)", name: "boneKg" },
          { label: "Grasa Visceral", name: "visceralFat" },
          { label: "IMC", name: "bmi" },
          { label: "Cadera (cm)", name: "hip" },
          { label: "Brazos (cm)", name: "arms" },
          { label: "Muslos (cm)", name: "thighs" },
          { label: "Pantorrillas (cm)", name: "calves" },
          { label: "Pecho (cm)", name: "chest" },
          { label: "Cintura (cm)", name: "waist" },
          { label: "Abdomen (cm)", name: "abdomen" },
          { label: "Calorías (Kcal)", name: "kcla" },
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
              step="0.01"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
        ))}

        <input type="hidden" name="userId" value={formData.userId} />

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-semibold w-full"
        >
          Guardar Métricas
        </button>
      </form>
    </div>
  );
};

export default HealthMetricsForm;
