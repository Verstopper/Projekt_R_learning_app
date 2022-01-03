package projekt.service;

import projekt.domain.Student;
import projekt.dto.GradeAddDto;
import projekt.dto.StudentAddDto;

import java.io.InvalidObjectException;

public interface GradeService {
    Integer addGrade(GradeAddDto gradeAddDto) throws InvalidObjectException;
    Student addStudent(Integer id, StudentAddDto studentAddDto) throws InvalidObjectException;
}
