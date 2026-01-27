// Initial Mock Data
const initialLecturers = [
    { id: "prof_smith", name: "Dr. Smith", status: "Available", cabin: "Room 101", pass: "pass123" },
    { id: "prof_doe", name: "Prof. Doe", status: "In Class", cabin: "Lab 2", pass: "pass456" },
    { id: "dr_jones", name: "Dr. Jones", status: "Absent", cabin: "Block C", pass: "pass789" }
];

// Initialize State from LocalStorage or default
let lecturers = JSON.parse(localStorage.getItem('lecturerData')) || initialLecturers;
let currentUser = null;

// Navigation Logic
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(`${viewId}-view`).classList.remove('hidden');
    if(viewId === 'student') renderStudentList();
}

// Render Student View
function renderStudentList() {
    const listContainer = document.getElementById('lecturer-list');
    listContainer.innerHTML = lecturers.map(lec => `
        <div class="card">
            <h3>${lec.name}</h3>
            <p><strong>Location:</strong> ${lec.cabin}</p>
            <span class="status-pill status-${lec.status.replace(/\s+/g, '-')}">
                ${lec.status}
            </span>
        </div>
    `).join('');
}

// Lecturer Login
function handleLogin() {
    const userIn = document.getElementById('username').value;
    const passIn = document.getElementById('password').value;
    
    const user = lecturers.find(l => l.id === userIn && l.pass === passIn);
    
    if (user) {
        currentUser = user;
        showLecturerDashboard();
    } else {
        document.getElementById('login-error').innerText = "Invalid credentials!";
    }
}

// Dashboard Logic
function showLecturerDashboard() {
    showView('lecturer');
    document.getElementById('prof-name').innerText = currentUser.name;
    document.getElementById('status-select').value = currentUser.status;
    document.getElementById('cabin-input').value = currentUser.cabin;
}

function updateLecturerData() {
    const newStatus = document.getElementById('status-select').value;
    const newCabin = document.getElementById('cabin-input').value;

    // Update state
    lecturers = lecturers.map(l => 
        l.id === currentUser.id ? { ...l, status: newStatus, cabin: newCabin } : l
    );

    // Persist to "database" (LocalStorage)
    localStorage.setItem('lecturerData', JSON.stringify(lecturers));
    alert("Profile updated successfully!");
    showView('student'); // Redirect to see changes
}

function logout() {
    currentUser = null;
    showView('login');
}

// Initial Load
renderStudentList();