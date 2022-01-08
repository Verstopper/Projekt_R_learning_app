package projekt.service;

import projekt.domain.Student;
import projekt.dto.GradeAddDto;
import projekt.dto.StudentAddDto;

import java.io.InvalidObjectException;

public interface GradeService {
    boolean addGrade(GradeAddDto gradeAddDto) throws InvalidObjectException;
    Student addStudent(StudentAddDto studentAddDto) throws InvalidObjectException, Exception;
}
