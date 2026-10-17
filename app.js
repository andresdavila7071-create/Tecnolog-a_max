const technologies = [
  {name:'Inteligencia artificial',icon:'✳',text:'Modelos que reconocen patrones, recomiendan opciones o generan contenido.',example:'Un asistente crea preguntas de repaso.',detail:'La IA aprende relaciones a partir de ejemplos. Puede clasificar imágenes, traducir o generar ideas; no piensa como una persona y puede responder mal.',practical:'Pídele una explicación breve, contrasta sus datos y redacta la respuesta final con tus propias ideas.',glow:'rgba(93,233,244,.18)'},
  {name:'Internet de las cosas',icon:'⌁',text:'Objetos conectados que recogen y comparten información.',example:'Un sensor avisa si una planta necesita agua.',detail:'El Internet de las cosas conecta sensores y aparatos para medir condiciones o activar acciones. Cada conexión también exige proteger los datos y el dispositivo.',practical:'Un sensor mide humedad y puede activar el riego cuando la tierra está seca.',glow:'rgba(115,145,255,.2)'},
  {name:'Realidad virtual y aumentada',icon:'◉',text:'Entornos inmersivos o capas digitales sobre el mundo real.',example:'Explorar el sistema solar en una simulación.',detail:'La realidad virtual crea un entorno digital inmersivo. La realidad aumentada añade elementos digitales a la vista del entorno real.',practical:'Una clase puede visitar un museo virtual o ver un modelo 3D del corazón.',glow:'rgba(255,123,169,.18)'},
  {name:'Robótica',icon:'◈',text:'Máquinas programadas que perciben y actúan en su entorno.',example:'Un robot educativo sigue una ruta.',detail:'Un robot combina una estructura mecánica, sensores, actuadores y un programa. Puede ayudar en tareas repetitivas o en lugares difíciles de alcanzar.',practical:'Un sensor detecta un obstáculo y el programa cambia la dirección de las ruedas.',glow:'rgba(186,140,255,.2)'},
  {name:'Programación y seguridad',icon:'</>',text:'Instrucciones para resolver problemas y hábitos para cuidar datos.',example:'Crear un juego y proteger las cuentas.',detail:'Programar expresa instrucciones para un computador. La seguridad digital incluye contraseñas únicas, actualizaciones y verificación en dos pasos.',practical:'Un programa organiza datos; una contraseña diferente para cada cuenta reduce riesgos.',glow:'rgba(181,244,126,.16)'},
  {name:'Computación en la nube',icon:'☁',text:'Servicios conectados para guardar archivos y colaborar.',example:'Editar una presentación en equipo.',detail:'La nube utiliza servidores conectados para guardar datos y ejecutar servicios. Permite colaborar desde varios lugares; revisa permisos y privacidad.',practical:'Un equipo edita el mismo documento sin enviarse versiones diferentes.',glow:'rgba(186,140,255,.17)'},
  {name:'Automatización',icon:'↻',text:'Sistemas que repiten tareas según reglas o sensores.',example:'Una luz se enciende al detectar movimiento.',detail:'La automatización realiza tareas repetitivas con poca intervención manual. Se debe supervisar el sistema cuando el contexto cambia.',practical:'Un sensor activa una lámpara al detectar movimiento y otra regla la apaga después.',glow:'rgba(255,193,100,.17)'},
  {name:'Dispositivos inteligentes',icon:'▣',text:'Aparatos con sensores, software y a menudo conexión a Internet.',example:'Un reloj registra pasos y actividad.',detail:'Un dispositivo inteligente recoge datos y responde mediante software. Revisa qué información guarda, por cuánto tiempo y quién puede verla.',practical:'Un reloj estima los pasos, pero no sustituye una evaluación médica.',glow:'rgba(115,145,255,.18)'}
];
const make = (tag, className = '', text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};

const techGrid = document.querySelector('#tech-grid');
const techDialog = document.querySelector('#tech-dialog');
technologies.forEach((tech, index) => {
  const card = make('article', 'tech-card');
  card.style.setProperty('--glow', tech.glow);
  const top = make('div', 'tech-card-top');
  const icon = make('span', 'tech-emoji', tech.icon);
  icon.setAttribute('aria-hidden', 'true');
  top.append(icon, make('span', 'tech-number', String(index + 1).padStart(2, '0')));
  card.append(top, make('h3', '', tech.name), make('p', '', tech.text));
  const example = make('p', 'tech-example');
  example.append(make('b', '', 'Ejemplo: '), document.createTextNode(tech.example));
  const button = make('button', 'tech-discover', 'Conocer más ↗');
  button.type = 'button';
  button.dataset.technology = String(index);
  card.append(example, button);
  techGrid.append(card);
});
techGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-technology]');
  if (!button) return;
  const index = Number(button.dataset.technology);
  const tech = technologies[index];
  document.querySelector('#dialog-kicker').textContent = 'TECNOLOGÍA / ' + String(index + 1).padStart(2, '0');
  document.querySelector('#dialog-emoji').textContent = tech.icon;
  document.querySelector('#dialog-title').textContent = tech.name;
  document.querySelector('#dialog-description').textContent = tech.detail;
  document.querySelector('#dialog-example').textContent = tech.practical;
  techDialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => techDialog.close());
techDialog.addEventListener('click', (event) => { if (event.target === techDialog) techDialog.close(); });

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

const quizQuestions = [
  {q:'¿Qué describe mejor a la inteligencia artificial actual?',o:['Un programa que encuentra patrones en datos','Una mente humana dentro del computador','Una máquina que siempre sabe la verdad'],a:0,e:'Los modelos calculan patrones aprendidos. No tienen conciencia y pueden equivocarse.'},
  {q:'¿Qué paso ayuda a comprobar una respuesta generada por IA?',o:['Compartirla de inmediato','Compararla con fuentes confiables','Suponer que el tono seguro significa que es cierta'],a:1,e:'Una respuesta fluida también puede inventar datos. Contrasta afirmaciones importantes.'},
  {q:'¿Cuál es un ejemplo de Internet de las cosas?',o:['Un cuaderno impreso','Un sensor conectado que mide humedad','Un archivo guardado sin conexión'],a:1,e:'El IoT enlaza objetos y sensores para enviar o recibir datos.'},
  {q:'¿Qué diferencia principal hay entre RV y RA?',o:['La RV crea un espacio digital; la RA superpone información al entorno real','La RV solo sirve para escribir y la RA para calcular','No hay ninguna diferencia'],a:0,e:'La realidad virtual sumerge en un entorno digital; la aumentada conserva la vista del entorno y añade capas.'},
  {q:'¿Qué componente permite que un robot detecte un obstáculo?',o:['Un sensor','Una presentación','Un buscador'],a:0,e:'Los sensores registran señales como distancia, luz o movimiento.'},
  {q:'¿Qué hace principalmente una hoja de cálculo?',o:['Organiza datos y permite calcular con fórmulas','Crea una videollamada automáticamente','Garantiza que un dato sea verdadero'],a:0,e:'Las hojas ordenan datos y calculan resultados; es necesario revisar fórmulas y unidades.'},
  {q:'¿Qué caracteriza a un buen buscador para una investigación escolar?',o:['Se queda con el primer resultado','Contrasta autoría, fecha y más de una fuente','Confía solo en publicaciones anónimas'],a:1,e:'La posición de un resultado no es garantía de calidad; comprueba autoría y contexto.'},
  {q:'¿Cómo se puede proteger una cuenta?',o:['Reutilizando una contraseña sencilla','Compartiendo el código de verificación','Usando una clave única y segundo paso'],a:2,e:'Las claves diferentes y la verificación en dos pasos dificultan el acceso no autorizado.'},
  {q:'¿Qué debe hacer un formulario accesible?',o:['Ocultar para qué sirve cada campo','Etiquetar los campos y explicar errores','Obligar a compartir datos personales'],a:1,e:'Una etiqueta clara y un mensaje de error útil permiten entender y corregir el formulario.'},
  {q:'¿Qué aporta una buena prueba de una página web?',o:['Comprobar enlaces, teclado, tamaño móvil y formularios','Confirmar solo que los colores gusten','Evitar que usuarios prueben las funciones'],a:0,e:'Probar acciones reales en distintos tamaños ayuda a encontrar problemas antes de publicar.'}
];
let quizIndex = 0;
let quizScore = 0;
let quizLocked = false;
const quizCounter = document.querySelector('#quiz-counter');
const quizScoreLabel = document.querySelector('#quiz-score');
const quizProgress = document.querySelector('#quiz-progress');
const quizQuestion = document.querySelector('#quiz-question');
const quizOptions = document.querySelector('#quiz-options');
const quizFeedback = document.querySelector('#quiz-feedback');
const quizNext = document.querySelector('#quiz-continue');
function renderQuiz(moveFocus = false) {
  const item = quizQuestions[quizIndex];
  quizLocked = false;
  quizCounter.textContent = 'PREGUNTA ' + String(quizIndex + 1).padStart(2, '0') + ' / 10';
  quizScoreLabel.textContent = String(quizScore);
  quizProgress.style.width = (quizIndex / quizQuestions.length * 100) + '%';
  quizQuestion.textContent = item.q;
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';
  quizNext.hidden = true;
  quizOptions.replaceChildren();
  item.o.forEach((answer, index) => {
    const button = make('button', 'quiz-option', answer);
    button.type = 'button';
    button.addEventListener('click', () => {
      if (quizLocked) return;
      if (index !== item.a) {
        button.disabled = true;
        button.classList.add('incorrect');
        quizFeedback.textContent = 'Inténtalo de nuevo. ' + item.e;
        quizFeedback.className = 'quiz-feedback try';
        return;
      }
      quizLocked = true;
      quizScore += 1;
      quizScoreLabel.textContent = String(quizScore);
      quizProgress.style.width = ((quizIndex + 1) / quizQuestions.length * 100) + '%';
      [...quizOptions.children].forEach((option) => { option.disabled = true; });
      button.classList.add('correct');
      quizFeedback.textContent = '¡Correcto! ' + item.e;
      quizFeedback.className = 'quiz-feedback good';
      quizNext.hidden = false;
      quizNext.innerHTML = quizIndex === quizQuestions.length - 1 ? 'Ver resultado <span>→</span>' : 'Siguiente pregunta <span>→</span>';
    });
    quizOptions.append(button);
  });
  if (moveFocus) quizQuestion.focus();
}
function finishQuiz() {
  document.querySelector('#quiz-active').hidden = true;
  const result = document.querySelector('#quiz-result');
  result.replaceChildren();
  result.hidden = false;
  result.append(make('div', 'result-symbol', '✳'), make('div', 'result-score', quizScore + ' / 10'));
  result.append(make('h3', '', quizScore >= 8 ? '¡Excelente recorrido!' : quizScore >= 5 ? '¡Vas construyendo una gran base!' : '¡Buen comienzo!'));
  result.append(make('p', '', quizScore >= 8 ? 'Has conectado conceptos de tecnología y herramientas. Sigue contrastando la información.' : 'Revisa las explicaciones y vuelve a intentarlo: cada error también puede enseñar.'));
  const retry = make('button', 'button button-primary', 'Intentarlo de nuevo ↻');
  retry.type = 'button';
  retry.addEventListener('click', resetQuiz);
  const action = make('div', 'result-actions');
  action.append(retry);
  result.append(action);
  result.focus();
}
function resetQuiz() {
  quizIndex = 0;
  quizScore = 0;
  document.querySelector('#quiz-result').hidden = true;
  document.querySelector('#quiz-active').hidden = false;
  renderQuiz(true);
}
quizNext.addEventListener('click', () => {
  if (quizIndex < quizQuestions.length - 1) {
    quizIndex += 1;
    renderQuiz(true);
  } else finishQuiz();
});
renderQuiz();

const gameData = {
  tech: [
    {image:'assets/robotics.png',alt:'Robot escolar y estudiantes trabajan con circuitos',caption:'PISTA VISUAL · SENSORES Y ROBÓTICA',q:'El robot avanza, detecta una caja y gira para esquivarla. ¿Qué pieza percibe la caja?',o:['El sensor de distancia','La batería','La carcasa'],a:0,e:'El sensor mide una señal del entorno. El programa interpreta el dato y ordena a los motores girar.'},
    {image:'assets/digital-world.png',alt:'Pantalla con filas de ceros y unos',caption:'PISTA VISUAL · CÓDIGO BINARIO',q:'En una representación binaria aparecen 0 y 1. ¿Qué son en un sistema digital?',o:['Dos estados que ayudan a representar información','Los únicos números que existen','Una contraseña que siempre es segura'],a:0,e:'Los sistemas digitales representan información con estados, que suelen expresarse como 0 y 1. Luego el software interpreta patrones más complejos.'},
    {image:'assets/virtual-reality.png',alt:'Estudiante observa una simulación educativa con visor',caption:'PISTA VISUAL · REALIDAD INMERSIVA',q:'Una estudiante usa un visor para recorrer un museo virtual. ¿Qué tecnología experimenta?',o:['Realidad virtual','Una hoja de cálculo','Internet de las cosas'],a:0,e:'La realidad virtual presenta un entorno digital inmersivo. La realidad aumentada, en cambio, superpone elementos al entorno real.'},
    {image:'assets/cybersecurity.png',alt:'Circuitos y escudo digital con código binario',caption:'PISTA VISUAL · SEGURIDAD DIGITAL',q:'Llega un mensaje urgente que pide tu código de acceso. ¿Cuál es el paso más seguro?',o:['Compartir el código para evitar un bloqueo','Entrar al servicio oficial por una vía conocida y verificar','Reenviar el enlace a tus amistades'],a:1,e:'Los códigos de acceso son privados. No uses enlaces inesperados; verifica desde la aplicación o dirección oficial.'}
  ],
  web: [
    {image:'assets/digital-tools.png',alt:'Dos estudiantes colaboran en una página web en un computador',caption:'PISTA VISUAL · NAVEGACIÓN',q:'Una visitante necesita encontrar rápido el apartado de juegos. ¿Qué ayuda más?',o:['Un menú claro con enlaces descriptivos','Una página sin títulos','Esconder los botones al final'],a:0,e:'Los enlaces descriptivos y la organización visible permiten anticipar adónde lleva cada acción.'},
    {image:'assets/learning-lab.png',alt:'Estudiantes completan una actividad digital en equipo',caption:'PISTA VISUAL · FORMULARIOS',q:'Un formulario marca un campo como incorrecto. ¿Qué mensaje le ayuda a corregirlo?',o:['“Error” sin más información','“El correo parece incompleto; revisa el formato”','No mostrar ningún aviso'],a:1,e:'El feedback específico explica qué revisar y permite corregir sin adivinar.'},
    {image:'assets/cybersecurity.png',alt:'Computador con código binario y protección de datos',caption:'PISTA VISUAL · PRIVACIDAD',q:'Una encuesta escolar pide nombre, dirección y teléfono aunque solo desea valorar el diseño. ¿Qué principio se incumple?',o:['Recoger solo los datos necesarios','La minimización de datos','La navegación con teclado'],a:1,e:'La minimización de datos consiste en solicitar solo lo necesario para el propósito explicado.'},
    {image:'assets/robotics.png',alt:'Equipo crea un prototipo y prueba sus controles',caption:'PISTA VISUAL · PRUEBAS',q:'¿Qué prueba mejora la experiencia de un sitio en celulares?',o:['Comprobar que los controles se pueden pulsar y leer sin zoom','Ver solo la versión de escritorio','Agregar más espacios vacíos'],a:0,e:'Prueba tamaño de letra, botones táctiles, menú, formularios y desplazamiento en una pantalla pequeña.'}
  ]
};
const gameState = {tech:{round:0,score:0,locked:false},web:{round:0,score:0,locked:false}};
function showGameResult(id) {
  const state = gameState[id];
  const play = document.querySelector('#' + id + '-game-play');
  const result = document.querySelector('#' + id + '-game-result');
  play.hidden = true;
  result.replaceChildren();
  result.hidden = false;
  result.append(make('div', 'result-symbol', state.score === 4 ? '✦' : '✳'));
  result.append(make('div', 'result-score', state.score + ' / 4'));
  result.append(make('h3', '', state.score === 4 ? '¡Misión completa!' : state.score >= 2 ? '¡Buen trabajo, explorador!' : '¡Has dado los primeros pasos!'));
  result.append(make('p', '', 'Terminaste las cuatro rondas. Cada explicación es una pista para aplicar lo aprendido fuera del juego.'));
  const actions = make('div', 'result-actions');
  const replay = make('button', 'button button-primary', 'Jugar otra vez ↻');
  replay.type = 'button';
  replay.addEventListener('click', () => startGame(id));
  actions.append(replay);
  result.append(actions);
  result.focus();
}
function renderGameRound(id) {
  const questions = gameData[id];
  const state = gameState[id];
  const current = questions[state.round];
  state.locked = false;
  document.querySelector('#' + id + '-game-round').textContent = 'RONDA ' + (state.round + 1) + ' / ' + questions.length;
  document.querySelector('#' + id + '-game-score').textContent = String(state.score);
  document.querySelector('#' + id + '-game-progress').style.width = (state.round / questions.length * 100) + '%';
  const image = document.querySelector('#' + id + '-game-image');
  image.src = current.image;
  image.alt = current.alt;
  document.querySelector('#' + id + '-game-caption').textContent = current.caption;
  document.querySelector('#' + id + '-game-question').textContent = current.q;
  const feedback = document.querySelector('#' + id + '-game-feedback');
  feedback.textContent = '';
  feedback.className = 'game-feedback';
  const next = document.querySelector('#' + id + '-game-next');
  next.hidden = true;
  const choices = document.querySelector('#' + id + '-game-choices');
  choices.replaceChildren();
  current.o.forEach((answer, index) => {
    const button = make('button', 'game-choice', answer);
    button.type = 'button';
    button.addEventListener('click', () => {
      if (state.locked) return;
      if (index !== current.a) {
        button.disabled = true;
        button.classList.add('incorrect');
        feedback.textContent = 'No es esa. ' + current.e;
        feedback.classList.add('try');
        return;
      }
      state.locked = true;
      state.score += 1;
      document.querySelector('#' + id + '-game-score').textContent = String(state.score);
      document.querySelector('#' + id + '-game-progress').style.width = ((state.round + 1) / questions.length * 100) + '%';
      [...choices.children].forEach((choice) => { choice.disabled = true; });
      button.classList.add('correct');
      feedback.textContent = '¡Muy bien! ' + current.e;
      feedback.classList.add('good');
      next.hidden = false;
      next.innerHTML = state.round === questions.length - 1 ? 'Ver resultado <span>→</span>' : 'Siguiente ronda <span>→</span>';
    });
    choices.append(button);
  });
}
function startGame(id) {
  gameState[id] = {round:0,score:0,locked:false};
  document.querySelector('#' + id + '-game-intro').hidden = true;
  document.querySelector('#' + id + '-game-result').hidden = true;
  document.querySelector('#' + id + '-game-play').hidden = false;
  renderGameRound(id);
  document.querySelector('#' + id + '-game-question').focus();
}
['tech','web'].forEach((id) => {
  document.querySelector('[data-start="' + id + '"]').addEventListener('click', () => startGame(id));
  document.querySelector('#' + id + '-game-next').addEventListener('click', () => {
    if (gameState[id].round < gameData[id].length - 1) {
      gameState[id].round += 1;
      renderGameRound(id);
      document.querySelector('#' + id + '-game-question').focus();
    } else showGameResult(id);
  });
});

const storageKey = 'tecnologia-ia-feedback-v1';
function readStoredFeedback() {
  try { return JSON.parse(localStorage.getItem(storageKey) || '{"surveys":[]}'); }
  catch { return {surveys:[]}; }
}
function saveFeedbackLocally(record) {
  const saved = readStoredFeedback();
  saved.surveys.push({...record,savedAt:new Date().toISOString()});
  try {
    localStorage.setItem(storageKey, JSON.stringify(saved));
    return true;
  } catch { return false; }
}
const surveyForm = document.querySelector('#survey-form');
const surveyMessage = document.querySelector('#survey-message');
surveyForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  surveyMessage.textContent = '';
  surveyMessage.className = 'form-message form-wide';
  if (!surveyForm.reportValidity()) {
    surveyMessage.textContent = 'Completa los campos obligatorios antes de enviar.';
    surveyMessage.classList.add('error');
    return;
  }
  const record = Object.fromEntries(new FormData(surveyForm).entries());
  const submit = surveyForm.querySelector('[type="submit"]');
  submit.disabled = true;
  submit.setAttribute('aria-busy','true');
  try {
    let shared = false;
    try {
      const user = window.websim ? await window.websim.getUser() : null;
      if (user && user.username !== 'anonymous') {
        const response = await fetch('/api/feedback/survey',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(record)});
        shared = response.ok;
      }
    } catch {}
    const message = shared ? '¡Gracias! Tu opinión se envió para revisión.' : '¡Gracias! Tu opinión quedó guardada solo en este dispositivo.';
    if (!shared && !saveFeedbackLocally(record)) throw new Error('No fue posible guardar la opinión. Inténtalo de nuevo.');
    surveyForm.reset();
    surveyMessage.textContent = message;
    surveyMessage.className = 'form-message form-wide success';
  } catch (error) {
    surveyMessage.textContent = error.message;
    surveyMessage.classList.add('error');
  } finally {
    submit.disabled = false;
    submit.removeAttribute('aria-busy');
  }
});
surveyForm.addEventListener('reset', () => {
  surveyMessage.textContent = '';
  surveyMessage.className = 'form-message form-wide';
});
