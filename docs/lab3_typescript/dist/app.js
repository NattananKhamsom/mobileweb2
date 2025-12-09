import { StudentManager } from "./managers/StudentManager";
import { showList } from "./utils/showList";
// ใช้งาน StudentManager
const manager = new StudentManager();
// โหลดข้อมูลเมื่อเริ่มต้น และ Render ตารางทันที
manager.loadFromLocalStorage();
renderTable();
/**
 * ฟังก์ชันแสดงผลตารางนักศึกษา
 * @param elementId ID ของ tbody (ค่าเริ่มต้นคือ studentTableBody)
 * @param studentsToDisplay รายการนักศึกษาที่จะแสดง (หากต้องการแสดงรายการที่ค้นหา)
 */
function renderTable(elementId = "studentTableBody", studentsToDisplay) {
    const tableBody = document.getElementById(elementId);
    if (!tableBody) {
        console.error(`Table body element with ID '${elementId}' not found.`);
        return;
    }
    // เลือกรายการที่จะแสดง: ถ้ามีการส่ง studentsToDisplay มาให้ใช้รายการนั้น, ไม่อย่างนั้นให้ใช้รายการทั้งหมด
    const students = studentsToDisplay ? studentsToDisplay : manager.getAllStudents();
    // ใช้งาน showList เพื่อแสดงสถานะการค้นหา
    showList(students);
    // ล้างเนื้อหาตาราง
    tableBody.innerHTML = "";
    if (students.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-gray-500">
                    <i data-lucide="clipboard-list" class="w-5 h-5 inline-block align-text-bottom"></i> ยังไม่มีข้อมูลนักศึกษาในระบบ
                </td>
            </tr>
        `;
        window.lucide.createIcons(); // Re-render icons
        return;
    }
    // Loop เพื่อเพิ่มแถวข้อมูล
    students.forEach((s) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition duration-100';
        row.innerHTML = `
            <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${s.id}</td>
            <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-700">${s.title_name} ${s.first_name} ${s.last_name}</td>
            <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-700">${s.email}</td>
            <td class="px-6 py-3 whitespace-nowrap text-sm text-center text-gray-700">${s.year}</td>
            <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-700">${s.major}</td>
            <td class="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-center">
                <!-- เพิ่มปุ่ม Action เช่น Delete/Edit (ไม่ได้ใช้งานใน Lab นี้) -->
            </td>
        `;
        tableBody.appendChild(row);
    });
}
// --- Event Handlers ---
// 1. ปุ่มเพิ่มข้อมูล (Add Button)
document.getElementById("addBtn").onclick = () => {
    // 1. ดึงค่าจาก Input (แก้ไข ID ให้ตรงกับ HTML แล้ว)
    const id = document.getElementById("id").value;
    const title_name = document.getElementById("title").value;
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const year = Number(document.getElementById("year").value);
    const major = document.getElementById("major").value;
    // ตรวจสอบความสมบูรณ์ของข้อมูลที่จำเป็น
    if (!id || !title_name || !first_name || !last_name) {
        console.error("Please fill in all required fields (ID, Title, First Name, Last Name).");
        // ในสถานการณ์จริงควรใช้ Modal UI แทน alert
        return;
    }
    const student = { id, title_name, first_name, last_name, email, year, major };
    // 2. เพิ่มนักศึกษาและบันทึกลง Local Storage
    manager.addStudent(student);
    // 3. Render ตารางใหม่
    renderTable();
    // 4. Clear Form
    document.getElementById("addStudentForm").reset();
};
// 2. ปุ่มค้นหาด้วยชื่อ (Search By Name)
document.getElementById("searchNameBtn").onclick = () => {
    const keyword = document.getElementById("searchName").value;
    const results = manager.findStudentsByName(keyword);
    // Render ตารางด้วยผลลัพธ์การค้นหาเท่านั้น
    renderTable("studentTableBody", results);
};
// 3. ปุ่มค้นหาด้วยสาขา (Search By Major)
document.getElementById("searchMajorBtn").onclick = () => {
    const keyword = document.getElementById("searchMajor").value;
    const results = manager.findStudentsByMajor(keyword);
    // Render ตารางด้วยผลลัพธ์การค้นหาเท่านั้น
    renderTable("studentTableBody", results);
};
// 4. ปุ่มค้นหาด้วย Email (Search By Email)
document.getElementById("searchEmailBtn").onclick = () => {
    const email = document.getElementById("searchEmail").value;
    const result = manager.findStudentByEmail(email);
    if (result) {
        // Render ตารางด้วยผลลัพธ์เดียว
        renderTable("studentTableBody", [result]);
    }
    else {
        // Render ตารางเปล่าและแสดงข้อความไม่พบข้อมูล
        renderTable("studentTableBody", []);
    }
};
