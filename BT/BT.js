const listStudents = [];

class Student {

    static addStudent(name, age, isFemale) {
        const student = {
            name,
            age,
            isFemale
        }
        listStudents.push(student);
        //Console.log(student);
    }
    static getStudentByIndex(index) {
        // if<space>
        if(index != undefined && Number.isInteger(index)) {
            return console.log(listStudents[index]);
        }
    }

    static deleteStudentByName(name) {
        if(name != null) {
            let i = 0;
            for(const item of listStudents) {
                // space
                if(item.name == name){
                    // end comma
                    listStudents.splice(i, 1)
                    // shouldn't use log in function
                    return console.log('Đã xóa');
                }
                i++;
            }
        }
        //
        return console.log('Không tìm thấy!');
    }

    static getIndexStudentByName(name) {
        // space
        if(name != null) {
            let i = 0;
            // space
            for(const item of listStudents) {
                // comma
                if(item.name == name)
                return console.log('Vị trí của sinh viên trong mảng: ' + i);
                i++;
            }
        }
        return console.log('Không tìm thấy!');
    }
}
//add student
console.log('thêm sinh viên');
Student.addStudent('Nguyễn A', 18, 1);
Student.addStudent('Trần B', 19, 1);
Student.addStudent('Phạm C', 20, 0);
console.log(listStudents);
console.log('\n');

console.log('lấy sinh viên theo vị trí trong mảng');
Student.getStudentByIndex(1);
console.log('\n');

console.log('xóa sinh viên theo theo tên');
Student.deleteStudentByName('Trần B');
console.log('\n');

console.log('lấy vị trí của sinh viên trong mảng theo tên');
Student.getIndexStudentByName('Phạm C');
console.log('\n');
console.log(listStudents);
