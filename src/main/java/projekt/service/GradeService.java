package projekt.service;

import projekt.dto.GradeAddDto;

import java.io.InvalidObjectException;

public interface GradeService {
    void addGrade(GradeAddDto gradeAddDto) throws InvalidObjectException;
}
