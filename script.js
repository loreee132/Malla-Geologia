const grid = document.getElementById('grid');

// Define todos los ramos con prerequisitos
const courses = [
  // 1er semestre
  {id: "intro_calculo", name: "Introducción al cálculo", semester: 1, prerequisites: []},
  {id: "algebra_geometria", name: "Álgebra y geometría", semester: 1, prerequisites: []},
  {id: "quimica1", name: "Química general 1", semester: 1, prerequisites: []},
  {id: "intro_ciencias_tierra", name: "Introducción a las ciencias de la tierra", semester: 1, prerequisites: []},
  {id: "ingles1", name: "Inglés 1", semester: 1, prerequisites: []},

  // 2do semestre
  {id: "fisica1", name: "Física 1", semester: 2, prerequisites: ["intro_calculo"]},
  {id: "calculo_dif", name: "Cálculo diferencial e integral", semester: 2, prerequisites: ["intro_calculo"]},
  {id: "algebra_lineal", name: "Álgebra lineal", semester: 2, prerequisites: ["algebra_geometria"]},
  {id: "quimica2", name: "Química general 2", semester: 2, prerequisites: ["quimica1"]},
  {id: "geologia_general", name: "Geología general", semester: 2, prerequisites: ["intro_ciencias_tierra","algebra_geometria","quimica1"]},
  {id: "ingles2", name: "Inglés 2", semester: 2, prerequisites: ["ingles1"]},

  // 3er semestre
  {id: "fisica2", name: "Física 2", semester:3, prerequisites:["fisica1","calculo_dif"]},
  {id: "calculo_varias", name: "Cálculo en varias variables", semester:3, prerequisites:["calculo_dif"]},
  {id: "analisis_datos", name: "Introducción análisis de datos", semester:3, prerequisites:["calculo_dif","algebra_lineal"]},
  {id: "termodinamica", name: "Termodinámica de la tierra", semester:3, prerequisites:["quimica2","calculo_dif"]},
  {id: "estratigrafia", name: "Estratigrafía andina", semester:3, prerequisites:["geologia_general"]},
  {id: "cristalografia", name: "Cristalografía y mineralogía de silicatos", semester:3, prerequisites:["quimica2","geologia_general"]},
  {id: "ingles3", name: "Inglés 3", semester:3, prerequisites:["ingles2"]},

  // 4to semestre
  {id: "geofisica", name: "Fundamentos de Geofísica", semester:4, prerequisites:["fisica2","calculo_varias"]},
  {id: "geoquimica", name: "Geoquímica", semester:4, prerequisites:["termodinamica","cristalografia"]},
  {id: "petrologia_fund", name: "Fundamentos de petrología", semester:4, prerequisites:["cristalografia","termodinamica"]},
  {id: "estructural", name: "Geología estructural", semester:4, prerequisites:["estratigrafia","fisica2"]},
  {id: "cartografia", name: "Cartografía y herramientas SIG", semester:4, prerequisites:["geologia_general","analisis_datos"]},
  {id: "geomorfologia", name: "Geomorfología", semester:4, prerequisites:["estratigrafia","fisica2","termodinamica"]},
];

// Cargar estado guardado
let approved = JSON.parse(localStorage.getItem("approvedCourses")) || [];

// Agrupar por semestre
const semesters = {};
courses.forEach(c => {
  if (!semesters[c.semester]) semesters[c.semester] = [];
  semesters[c.semester].push(c);
});

// Crear HTML dinámico
Object.keys(semesters).sort().forEach(sem => {
  const div = document.createElement("div");
  div.className = "semester";
  div.innerHTML = `<h2>${sem}° Semestre</h2>`;
  semesters[sem].forEach(course => {
    const c = document.createElement("div");
    c.className = "course";
    c.dataset.id = course.id;
    c.dataset.prerequisites = course.prerequisites.join(",");
    c.textContent = course.name;
    div.appendChild(c);
  });
  grid.appendChild(div);
});

// Inicializar estado
function updateState() {
  document.querySelectorAll(".course").forEach(c => {
    const id = c.dataset.id;
    const prerequisites = c.dataset.prerequisites ? c.dataset.prerequisites.split(",") : [];
    if (approved.includes(id)) {
      c.className = "course approved";
    } else if (prerequisites.some(p => !approved.includes(p))) {
      c.className = "course locked";
    } else {
      c.className = "course pending";
    }
  });
}
updateState();

// Manejar clicks
grid.addEventListener("click", e => {
  if (!e.target.classList.contains("course")) return;
  const id = e.target.dataset.id;
  if (e.target.classList.contains("locked")) return;

  if (approved.includes(id)) {
    approved = approved.filter(x => x !== id);
  } else {
    approved.push(id);
  }
  localStorage.setItem("approvedCourses", JSON.stringify(approved));
  updateState();
});

// Reiniciar
document.getElementById("reset").addEventListener("click", () => {
  if (confirm("¿Seguro que quieres reiniciar tu progreso?")) {
    approved = [];
    localStorage.removeItem("approvedCourses");
    updateState();
  }
});

