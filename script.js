import React, { useState } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";

const curriculum = [
  {
    semestre: 1,
    ramos: [
      { nombre: "Química General I", prerequisitos: [], creditos: 8 },
      { nombre: "Técnicas de Laboratorio Químico", prerequisitos: [], creditos: 4 },
      { nombre: "Introducción al Álgebra y Cálculo", prerequisitos: [], creditos: 8 },
      { nombre: "Orientación Farmacéutica", prerequisitos: [], creditos: 3 },
      { nombre: "Inglés I", prerequisitos: [], creditos: 3 },
    ],
  },
  {
    semestre: 2,
    ramos: [
      { nombre: "Química General II", prerequisitos: ["Química General I"], creditos: 5 },
      { nombre: "Laboratorio de Química General", prerequisitos: ["Química General", "Técnicas de Laboratorio Químico"], creditos: 3 },
      { nombre: "Física General", prerequisitos: ["Introducción al Álgebra y Cálculo"], creditos: 5 },
      { nombre: "Cálculo Diferencial e Integral", prerequisitos: ["Introducción al Álgebra y Cálculo"], creditos: 6 },
      { nombre: "Química Transformadora", prerequisitos: [], creditos: 3 },
      { nombre: "Biología Celular", prerequisitos: ["Técnicas de Laboratorio Químico"], creditos: 5 },
      { nombre: "Inglés II", prerequisitos: ["Inglés I"], creditos: 3 },
    ],
  },
  {
    semestre: 3,
    ramos: [
      { nombre: "Química Orgánica", prerequisitos: ["Química General II"], creditos: 5 },
      { nombre: "Química Analítica I", prerequisitos: ["Química General II", "Laboratorio de Química General"], creditos: 5 },
      { nombre: "Fisiología Celular", prerequisitos: ["Física General", "Biología Celular"], creditos: 5 },
      { nombre: "Laboratorio I de Química Orgánica", prerequisitos: ["Química General II", "Laboratorio de Química General"], creditos: 4 },
      { nombre: "Estadística y Análisis de Datos", prerequisitos: ["Cálculo Diferencial e Integral"], creditos: 4 },
      { nombre: "Fundamentos de Ciencias Farmacéuticas", prerequisitos: ["Orientación Farmacéutica", "Química Transformadora"], creditos: 2 },
      { nombre: "Inglés III", prerequisitos: ["Inglés II"], creditos: 3 },
    ],
  },
  // Semestre 4 al 11 completados
  {
    semestre: 4,
    ramos: [
      { nombre: "Química Orgánica II", prerequisitos: ["Química Orgánica"], creditos: 5 },
      { nombre: "Química Analítica II", prerequisitos: ["Química Analítica I"], creditos: 5 },
      { nombre: "Fisicoquímica I", prerequisitos: ["Física General", "Cálculo Diferencial e Integral", "Química Orgánica"], creditos: 6 },
      { nombre: "Fisiología de Sistemas", prerequisitos: ["Fisiología Celular"], creditos: 4 },
      { nombre: "Laboratorio de Análisis Químico", prerequisitos: ["Laboratorio de Química General", "Química Analítica I", "Estadística y Análisis de Datos"], creditos: 4 },
      { nombre: "Práctica Intermedia", prerequisitos: ["Estadística y Análisis de Datos", "Fundamentos de Ciencias Farmacéuticas"], creditos: 3 },
      { nombre: "Inglés IV", prerequisitos: ["Inglés III"], creditos: 3 },
    ],
  },
  {
    semestre: 5,
    ramos: [
      { nombre: "Botánica y Farmacognosia", prerequisitos: ["Química Orgánica II", "Química Analítica II"], creditos: 7 },
      { nombre: "Bioquímica", prerequisitos: ["Química Orgánica II"], creditos: 5 },
      { nombre: "Farmacología General", prerequisitos: ["Laboratorio de Análisis Químico", "Fisiología de Sistemas"], creditos: 6 },
      { nombre: "Química de Heterocíclicos y Análisis Espectroscópico", prerequisitos: ["Química Orgánica II"], creditos: 5 },
      { nombre: "Laboratorio de Análisis Instrumental", prerequisitos: ["Química Analítica II", "Laboratorio de Análisis Químico"], creditos: 4 },
      { nombre: "Gestión de Calidad", prerequisitos: ["Fundamentos de Ciencias Farmacéuticas"], creditos: 3 },
    ],
  },
  {
    semestre: 6,
    ramos: [
      { nombre: "Fisicoquímica Farmacéutica", prerequisitos: ["Fisicoquímica I"], creditos: 6 },
      { nombre: "Farmacoquímica I", prerequisitos: ["Farmacología General", "Química de Heterocíclicos y Análisis Espectroscópico"], creditos: 5 },
      { nombre: "Farmacología de Sistemas I", prerequisitos: ["Farmacología General"], creditos: 5 },
      { nombre: "Fisiopatología Molecular", prerequisitos: ["Bioquímica", "Fisiología de Sistemas"], creditos: 5 },
      { nombre: "Microbiología", prerequisitos: ["Bioquímica"], creditos: 5 },
      { nombre: "Legislación Farmacéutica", prerequisitos: ["Práctica Intermedia", "Gestión de Calidad"], creditos: 4 },
    ],
  },
  {
    semestre: 7,
    ramos: [
      { nombre: "Farmacología de Sistemas II", prerequisitos: ["Microbiología", "Farmacología de Sistemas I"], creditos: 6 },
      { nombre: "Farmacoquímica II", prerequisitos: ["Farmacoquímica I"], creditos: 5 },
      { nombre: "Fisiopatología y Semiología", prerequisitos: ["Fisiopatología Molecular"], creditos: 5 },
      { nombre: "Tecnología Farmacéutica I", prerequisitos: ["Legislación Farmacéutica", "Fisicoquímica Farmacéutica"], creditos: 6 },
      { nombre: "Operaciones Unitarias para QyF", prerequisitos: ["Fisicoquímica Farmacéutica"], creditos: 5 },
      { nombre: "Salud Pública", prerequisitos: ["Legislación Farmacéutica"], creditos: 3 },
    ],
  },
  {
    semestre: 8,
    ramos: [
      { nombre: "Análisis de Medicamentos, Doping y Drogas de Abuso", prerequisitos: ["Laboratorio de Análisis Instrumental", "Farmacoquímica II"], creditos: 5 },
      { nombre: "Tecnología Farmacéutica II", prerequisitos: ["Tecnología Farmacéutica I", "Operaciones Unitarias para QyF"], creditos: 6 },
      { nombre: "Biofarmacia y Farmacocinética", prerequisitos: ["Farmacología General", "Tecnología Farmacéutica I"], creditos: 6 },
      { nombre: "Bioquímica Clínica", prerequisitos: ["Fisiopatología y Semiología"], creditos: 4 },
      { nombre: "Nutrición Clínica", prerequisitos: ["Fisiopatología y Semiología"], creditos: 3 },
      { nombre: "Administración y Gestión Farmacéutica", prerequisitos: ["Tecnología Farmacéutica I"], creditos: 3 },
      { nombre: "Estadística Farmacéutica", prerequisitos: ["Estadística y Análisis de Datos", "Salud Pública"], creditos: 3 },
    ],
  },
  {
    semestre: 9,
    ramos: [
      { nombre: "Farmacología Clínica", prerequisitos: ["Farmacología de Sistemas II", "Bioquímica Clínica", "Biofarmacia y Farmacocinética"], creditos: 6 },
      { nombre: "Toxicología", prerequisitos: ["Farmacología de Sistemas II", "Bioquímica Clínica"], creditos: 5 },
      { nombre: "Bromatología", prerequisitos: ["Laboratorio de Análisis Instrumental", "Nutrición Clínica"], creditos: 4 },
      { nombre: "Farmacia Asistencial", prerequisitos: ["Salud Pública", "Administración y Gestión Farmacéutica"], creditos: 4 },
      { nombre: "Tecnología Cosmética", prerequisitos: ["Tecnología Farmacéutica II"], creditos: 4 },
    ],
  },
  {
    semestre: 10,
    ramos: [
      { nombre: "Farmacia Clínica", prerequisitos: ["Farmacología Clínica"], creditos: 5 },
      { nombre: "Práctica Profesional en Farmacia Comunitaria", prerequisitos: ["Administración y Gestión Farmacéutica", "Farmacología Clínica", "Toxicología"], creditos: 7 },
      { nombre: "Biotecnología Farmacéutica", prerequisitos: ["Fisiopatología Molecular", "Tecnología Farmacéutica II"], creditos: 4 },
      { nombre: "Economía en Salud y Marketing Farmacéutico", prerequisitos: ["Salud Pública", "Administración y Gestión Farmacéutica", "Farmacología Clínica"], creditos: 3 },
      { nombre: "Innovación y Proyectos", prerequisitos: ["Estadística Farmacéutica"], creditos: 3 },
    ],
  },
  {
    semestre: 11,
    ramos: [
      { nombre: "Actividad Final de Titulación", prerequisitos: ["Los 10 semestres aprobados"], creditos: 30 },
    ],
  },`
    }
  ]
}
];

function App() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [aprobados, setAprobados] = useState({});

  const toggleAprobado = (ramo) => {
    setAprobados((prev) => ({
      ...prev,
      [ramo]: !prev[ramo],
    }));
  };

  const creditosAprobados = Object.entries(aprobados)
    .filter(([_, val]) => val)
    .reduce((acc, [ramo]) => {
      for (const semestre of curriculum) {
        const match = semestre.ramos.find((r) => r.nombre === ramo);
        if (match) return acc + match.creditos;
      }
      return acc;
    }, 0);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>Malla Interactiva - Química y Farmacia</h1>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Créditos aprobados: {creditosAprobados}
      </p>

      <div className="grid">
        {curriculum.map((sem, index) => (
          <button
            key={index}
            className="semestre-button"
            onClick={() => setSelectedSemester(index)}
          >
            Semestre {sem.semestre}
          </button>
        ))}
      </div>

      {selectedSemester !== null && (
        <div className="card">
          <h2>Semestre {curriculum[selectedSemester].semestre}</h2>
          <ul>
            {curriculum[selectedSemester].ramos.map((ramo, i) => (
              <li key={i} className="ramo-item">
                <input
                  type="checkbox"
                  checked={!!aprobados[ramo.nombre]}
                  onChange={() => toggleAprobado(ramo.nombre)}
                />
                <div>
                  <strong>{ramo.nombre}</strong> - {ramo.creditos} créditos
                  <br />
                  <small>
                    Prerrequisitos:{" "}
                    {ramo.prerequisitos.length > 0
                      ? ramo.prerequisitos.join(", ")
                      : "Ninguno"}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
