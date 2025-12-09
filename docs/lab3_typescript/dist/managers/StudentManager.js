// Key ที่ใช้ในการเก็บข้อมูลใน Local Storage
const STORAGE_KEY = "studentManagementData";
/**
 * จัดการชุดข้อมูลนักศึกษา และจัดการการบันทึก/โหลดจาก Local Storage
 */
export class StudentManager {
    constructor() {
        this.students = [];
        this.loadFromLocalStorage();
    }
    /**
     * โหลดข้อมูลนักศึกษาจาก Local Storage เมื่อเริ่มต้น
     */
    loadFromLocalStorage() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            try {
                // แปลง JSON string กลับเป็น array ของ Student objects
                this.students = JSON.parse(data);
                console.log("Students loaded from Local Storage:", this.students.length);
            }
            catch (e) {
                console.error("Error parsing student data from Local Storage:", e);
                this.students = []; // เคลียร์ถ้าข้อมูลเสียหาย
            }
        }
        else {
            this.students = [];
            console.log("No student data found in Local Storage.");
        }
    }
    /**
     * บันทึกข้อมูลนักศึกษาปัจจุบันลงใน Local Storage
     */
    saveToLocalStorage() {
        try {
            // แปลง array ของ Student objects เป็น JSON string ก่อนบันทึก
            const jsonString = JSON.stringify(this.students);
            localStorage.setItem(STORAGE_KEY, jsonString); // <--- กลไกการบันทึก
            console.log("Students successfully saved to Local Storage.");
        }
        catch (e) {
            console.error("Error saving student data to Local Storage:", e);
        }
    }
    /**
     * เพิ่มนักศึกษาใหม่ และทำการบันทึก
     */
    addStudent(student) {
        if (this.students.find(s => s.id === student.id)) {
            console.warn(`Student with ID ${student.id} already exists. Data not added.`);
            // ในสถานการณ์จริง ควรใช้ UI แสดงผลข้อความแจ้งเตือนแทน console.warn
            return;
        }
        this.students.push(student);
        this.saveToLocalStorage(); // <--- เรียกเมธอดบันทึก
    }
    /**
     * คืนค่ารายการนักศึกษาทั้งหมด
     */
    getAllStudents() {
        return [...this.students];
    }
    /**
     * ค้นหานักศึกษาจากชื่อจริงหรือนามสกุล
     */
    findStudentsByName(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        return this.students.filter(s => s.first_name.toLowerCase().includes(lowerKeyword) ||
            s.last_name.toLowerCase().includes(lowerKeyword));
    }
    /**
     * ค้นหานักศึกษาจากสาขาวิชา
     */
    findStudentsByMajor(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        return this.students.filter(s => s.major.toLowerCase().includes(lowerKeyword));
    }
    /**
     * ค้นหานักศึกษาจาก Email
     */
    findStudentByEmail(email) {
        return this.students.find(s => s.email.toLowerCase() === email.toLowerCase());
    }
}
