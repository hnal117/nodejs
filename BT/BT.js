const listStudents = [];

class Student {

    constructor(name, age, isFemale){
        this.name = name;
        this.age = age;
        this.isFemale = isFemale;
    }
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
        if(index != undefined && Number.isInteger(index)) {
            return console.log(listStudents[index]);
        }
    }

    static deleteStudentByName(name) {
        if(name != null) {
            let i = 0;
            for(const item of listStudents) {
                if(item.name == name){
                    listStudents.splice(i, 1)
                    return console.log('Đã xóa');
                }
                i++;
            }
        }
        return console.log('Không tìm thấy!');
    }

    static getIndexStudentByName(name) {
        if(name != null) {
            let i = 0;
            for(const item of listStudents) {
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
