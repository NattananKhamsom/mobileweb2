// src/utils/showList.ts
import { Student } from "../models/Student";

/**
 * แสดงรายการผลลัพธ์การค้นหาในส่วนสถานะด้านล่างตาราง
 * @param list รายการนักศึกษาที่ถูกกรองหรือค้นหา
 */
export function showList<T extends Student>(list: T[]): void {
    const statusElement = document.getElementById("listStatus");
    if (statusElement) {
        if (list.length === 0) {
            statusElement.innerHTML = `<i data-lucide="info" class="w-4 h-4 inline-block align-text-bottom text-red-500"></i> ไม่พบข้อมูลนักศึกษาที่ตรงกับเงื่อนไขการค้นหา`;
            statusElement.classList.remove('text-gray-500');
            statusElement.classList.add('text-red-500');
        } else {
            statusElement.innerHTML = `<i data-lucide="check" class="w-4 h-4 inline-block align-text-bottom text-success-green"></i> แสดงข้อมูลนักศึกษาจำนวน ${list.length} คน`;
            statusElement.classList.remove('text-red-500');
            statusElement.classList.add('text-gray-500');
        }
        // Re-render lucide icons if necessary (for search result indicator)
        (window as any).lucide.createIcons();
    }
}