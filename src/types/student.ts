import { user as User } from "./user";

export interface Student extends User {
    personalInfo: {
        idNumber: string;
        birthDate: string;
        birthPlace: string;
        nationality: string;
    };
    academicInfo: {
        studentId: string;
        cneNumber: string;
        level: string;
        major: string;
    };
    contact: {
        email: string;
        phone?: string;
    };
}

