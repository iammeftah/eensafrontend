import { Student } from '@/types/student';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface StudentProfileContextType {
    student: Student;
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    onEdit: (updatedStudent: Student) => void;
    isLoading: boolean; // Add isLoading to the context type
}

const StudentProfileContext = createContext<StudentProfileContextType | undefined>(undefined);

export const useStudentProfile = () => {
    const context = useContext(StudentProfileContext);
    if (context === undefined) {
        throw new Error('useStudentProfile must be used within a StudentProfileProvider');
    }
    return context;
};

export const StudentProfileProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [student, setStudent] = useState<Student>({
        // Initialize with your mock student data here
        id: '1',
        name: 'MEFTAH Ahmed-reda',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        skills: {
            frontend: 75,
            backend: 85,
            uiux: 70,
            security: 65,
            devops: 60
        },
        personalInfo: {
            idNumber: 'BW15024',
            birthDate: '16/08/2001',
            birthPlace: 'CASABLANCA ANFA',
            nationality: 'MAROCAINE'
        },
        academicInfo: {
            studentId: '1923376',
            cneNumber: 'R134889058',
            level: 'CI5 (Troisième Année Cycle Ingénieur)',
            major: 'GI (Génie Informatique)'
        },
        contact: {
            email: 'meftahahmedreda02@gmail.com',
            phone: 'Non renseigné'
        }
    });
    const [darkMode, setDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state

    // Simulate loading data from an API
    useEffect(() => {
        const fetchData = async () => {
            // Simulate an API call delay
            setTimeout(() => {
                setIsLoading(false); // Set loading to false after data is "fetched"
            }, 2000);
        };

        fetchData();
    }, []);

    const onEdit = (updatedStudent: Student) => {
        setStudent(updatedStudent);
        // Here you would typically call an API to update the student data
        console.log('Updated student:', updatedStudent);
    };

    return (
        <StudentProfileContext.Provider value={{ student, darkMode, setDarkMode, onEdit, isLoading }}>
            {children}
        </StudentProfileContext.Provider>
    );
};