const grid = document.getElementById('grid');

// TODOS LOS RAMOS Y PRERREQUISITOS
const courses = [
  // 1er semestre
  {id:"intro_calculo", name:"Introducción al cálculo", semester:1, prerequisites:[]},
  {id:"algebra_geometria", name:"Álgebra y geometría", semester:1, prerequisites:[]},
  {id:"quimica1", name:"Química general 1", semester:1, prerequisites:[]},
  {id:"intro_ciencias_tierra", name:"Introducción a las ciencias de la tierra", semester:1, prerequisites:[]},
  {id:"ingles1", name:"Inglés 1", semester:1, prerequisites:[]},
  // 2do semestre
  {id:"fisica1", name:"Física 1", semester:2, prerequisites:["intro_calculo"]},
  {id:"calculo_dif", name:"Cálculo diferencial e integral", semester:2, prerequisites:["intro_calculo"]},
  {id:"algebra_lineal", name:"Álgebra lineal", semester:2, prerequisites:["algebra_geometria"]},
  {id:"quimica2", name:"Química general 2", semester:2, prerequisites:["quimica1"]},
  {id:"geologia_general", name:"Geología general", semester:2, prerequisites:["intro_ciencias_tierra","algebra_geometria","quimica1"]},
  {id:"ingles2", name:"Inglés 2", semester:2, prerequisites:["ingles1"]},
  // 3er semestre
  {id:"fisica2", name:"Física 2", semester:3, prerequisites:["fisica1","calculo_dif"]},
  {id:"calculo_varias", name:"Cálculo en varias variables", semester:3, prerequisites:["calculo_dif"]},
  {id:"analisis_datos", name:"Introducción análisis de datos", semester:3, prerequisites:["calculo_dif","algebra_lineal"]},
  {id:"termodinamica", name:"Termodinámica de la tierra", semester:3, prerequisites:["quimica2","calculo_dif"]},
  {id:"estratigrafia", name:"Estratigrafía andina", semester:3, prerequisites:["geologia_general"]},
  {id:"cristalografia", name:"Cristalografía y mineralogía de silicatos", semester:3, prerequisites:["quimica2","geologia_general"]},
  {id:"ingles3", name:"Inglés 3", semester:3, prerequisites:["ingles2"]},
  // 4to semestre
  {id:"geofisica", name:"Fundamentos de Geofísica", semester:4, prerequisites:["fisica2","calculo_varias"]},
  {id:"geoquimica", name:"Geoquímica", semester:4, prerequisites:["termodinamica","cristalografia"]},
  {id:"petrologia_fund", name:"Fundamentos de petrología", semester:4, prerequisites:["cristalografia","termodinamica"]},
  {id:"estructural", name:"Geología estructural", semester:4, prerequisites:["estratigrafia","fisica2"]},
  {id:"cartografia", name:"Cartografía y herramientas SIG", semester:4, prerequisites:["geologia_general","analisis_datos"]},
  {id:"geomorfologia", name:"Geomorfología (Hito 1)", semester:4, prerequisites:["estratigrafia","fisica2","termodinamica"]},
  // 5to semestre
  {id:"geofisica_aplicada", name:"Geofísica aplicada", semester:5, prerequisites:["geofisica","estructural"]},
  {id:"mapeo_geologico", name:"Mapeo geológico", semester:5, prerequisites:["cartografia","geomorfologia"]},
  {id:"petrologia_exogena", name:"Petrología exógena", semester:5, prerequisites:["geoquimica","petrologia_fund"]},
  {id:"petrologia_endogena", name:"Petrología endógena", semester:5, prerequisites:["geoquimica","petrologia_fund"]},
  {id:"recursos_minerales", name:"Recursos minerales y energéticos", semester:5, prerequisites:["estructural"]},
  {id:"intro_fe", name:"Introducción a la fe", semester:5, prerequisites:[]},
  // 6to semestre
  {id:"evaluacion_proyectos", name:"Evaluación de proyectos sustentables", semester:6, prerequisites:[]},
  {id:"volcanologia", name:"Volcanología física", semester:6, prerequisites:["mapeo_geologico"]},
  {id:"geopatrimonio", name:"Geopatrimonio: conservación y turismo", semester:6, prerequisites:["mapeo_geologico"]},
  {id:"practica1", name:"Práctica 1", semester:6, prerequisites:["mapeo_geologico","recursos_minerales"]},
  {id:"geologia_aplicada", name:"Geología aplicada", semester:6, prerequisites:["geofisica_aplicada"]},
  {id:"etica_cristiana", name:"Ética cristiana", semester:6, prerequisites:[]},
  // 7mo semestre
  {id:"edafologia", name:"Edafología", semester:7, prerequisites:["geologia_aplicada"]},
  {id:"hidrogeologia", name:"Hidrogeología", semester:7, prerequisites:["geologia_aplicada"]},
  {id:"mapeo_avanzado", name:"Mapeo geológico avanzado", semester:7, prerequisites:["practica1"]},
  {id:"remociones_masa", name:"Remociones en masa", semester:7, prerequisites:["practica1"]},
  {id:"optativo1", name:"Optativo 1", semester:7, prerequisites:[]},
  {id:"certificacion1", name:"Certificación 1", semester:7, prerequisites:[]},
  // 8vo semestre
  {id:"hidroquimica", name:"Hidroquímica y contaminación de acuíferos", semester:8, prerequisites:["hidrogeologia","mapeo_avanzado"]},
  {id:"geologia_region", name:"Geología de la región en el contexto andino", semester:8, prerequisites:["geopatrimonio"]},
  {id:"metalogénesis", name:"Metalogénesis andina", semester:8, prerequisites:["recursos_minerales"]},
  {id:"peligros", name:"Evaluación de peligros geológicos (Hito 2)", semester:8, prerequisites:["volcanologia","mapeo_avanzado","remociones_masa"]},
  {id:"optativo2", name:"Optativo 2", semester:8, prerequisites:[]},
  {id:"certificacion2", name:"Certificación 2", semester:8, prerequisites:[]},
  // 9no semestre
  {id:"proyecto1", name:"Proyecto de título 1", semester:9, prerequisites:["hidroquimica","geologia_region","metalogénesis","peligros"]},
  {id:"practica2", name:"Práctica 2", semester:9, prerequisites:["hidroquimica","geologia_region","metalogénesis","peligros"]},
  {id:"ambiental", name:"Geología ambiental y cambio climático", semester:9, prerequisites:["hidroquimica","peligros"]},
  {id:"optativo3", name:"Optativo 3", semester:9, prerequisites:[]},
  {id:"certificacion3", name:"Certificación 3", semester:9, prerequisites:[]},
  // 10mo semestre
  {id:"proyecto2", name:"Proyecto de título 2", semester:10, prerequisites:["proyecto1","practica2","ambiental"]},
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
Object.keys(semesters).sort((a,b)=>a-b).forEach(sem => {
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
    const prerequisites = c.dataset.prerequisites ? c.dataset.prerequisites.split(",").filter(x=>x) : [];
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
