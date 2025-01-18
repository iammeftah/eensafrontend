import React, { useState, useRef } from 'react';
import { Pencil, Mail, Phone, User, Calendar, MapPin, Flag, School, Hash, X, Check, Camera, Image } from 'lucide-react';
import { useStudentProfile } from './StudentProfileContext';
import DarkModeToggle from '../layout/DarkModeToggle';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

export default function StudentProfile() {
    const { student, darkMode, setDarkMode, onEdit } = useStudentProfile();
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPhone, setEditingPhone] = useState(false);
    const [email, setEmail] = useState(student.contact.email);
    const [phone, setPhone] = useState(student.contact.phone || '');
    const [showPhotoOptions, setShowPhotoOptions] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = (field: 'email' | 'phone') => {
        if (field === 'email') {
            setEditingEmail(false);
            onEdit({ ...student, contact: { ...student.contact, email } });
        } else {
            setEditingPhone(false);
            onEdit({ ...student, contact: { ...student.contact, phone } });
        }
    };

    const handlePhotoEdit = (option: 'gallery' | 'camera') => {
        if (option === 'gallery') {
            fileInputRef.current?.click();
        } else if (option === 'camera') {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    const video = document.createElement('video');
                    video.srcObject = stream;
                    video.play();

                    const capturePhoto = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const photo = canvas.toDataURL('image/png');
                        console.log('Captured photo:', photo);
                        stream.getTracks().forEach(track => track.stop());
                    };

                    // Add a button to capture the photo
                    const captureButton = document.createElement('button');
                    captureButton.textContent = 'Capture Photo';
                    captureButton.onclick = capturePhoto;
                    document.body.appendChild(captureButton);
                })
                .catch(err => {
                    console.error('Error accessing camera:', err);
                });
        }
        setShowPhotoOptions(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Selected file:', file);
            // Handle file upload logic here
        }
    };

    const InfoItem = ({ icon: Icon, label, value, editable = false, onEdit }: { icon: any, label: string, value: string, editable?: boolean, onEdit?: () => void }) => (
        <div className="flex items-center justify-between p-4 border-b border-stone-700/50">
            <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-[#8B4513]" />
                <div>
                    <p className={`text-sm ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>{label}</p>
                    <p className={`text-base font-medium ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}>{value}</p>
                </div>
            </div>
            {editable && (
                <button onClick={onEdit} className="p-2 text-[#8B4513] hover:bg-[#8B4513] hover:text-white rounded-full transition-colors">
                    <Pencil className="w-4 h-4" />
                </button>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-950">
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200">
                        Student Profile
                    </h1>
                    <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-stone-800/50 rounded-lg p-6 text-center">
                            <div className="relative inline-block">
                                <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-[#8B4513] overflow-hidden">
                                    <img
                                        src={student.avatar || "/placeholder.svg"}
                                        alt={student.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                                        className="absolute bottom-0 right-0 bg-[#8B4513] text-white p-2 rounded-full hover:bg-[#7a3a0f] transition-colors z-50" // Added z-50 here
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {showPhotoOptions && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="bg-stone-800 p-8 rounded-lg w-11/12 max-w-2xl relative"
                                            >
                                                <button
                                                    onClick={() => setShowPhotoOptions(false)}
                                                    className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-200 transition-colors"
                                                >
                                                    <X className="w-6 h-6" />
                                                </button>
                                                <h2 className="text-xl font-semibold text-stone-200 mb-6">Edit Profile Photo</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div
                                                        onClick={() => handlePhotoEdit('gallery')}
                                                        className="flex flex-col items-center justify-center p-6 bg-stone-700 rounded-lg cursor-pointer hover:bg-stone-600 transition-colors"
                                                    >
                                                        <Image className="w-12 h-12 text-stone-200 mb-4" />
                                                        <p className="text-stone-200 text-lg">Choose from Gallery</p>
                                                    </div>
                                                    <div
                                                        onClick={() => handlePhotoEdit('camera')}
                                                        className="flex flex-col items-center justify-center p-6 bg-stone-700 rounded-lg cursor-pointer hover:bg-stone-600 transition-colors"
                                                    >
                                                        <Camera className="w-12 h-12 text-stone-200 mb-4" />
                                                        <p className="text-stone-200 text-lg">Take a Photo</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mt-4 text-stone-200">{student.name}</h2>
                            <p className="text-stone-400">{student.academicInfo.major}</p>
                        </div>
                    </div>

                    {/* Information Cards */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-stone-800/50 rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-stone-700/50">
                                <h2 className="text-xl font-semibold text-stone-200">Personal Information</h2>
                            </div>
                            <InfoItem icon={Hash} label="ID Number" value={student.personalInfo.idNumber} />
                            <InfoItem icon={Calendar} label="Birth Date" value={student.personalInfo.birthDate} />
                            <InfoItem icon={MapPin} label="Birth Place" value={student.personalInfo.birthPlace} />
                            <InfoItem icon={Flag} label="Nationality" value={student.personalInfo.nationality} />
                        </div>

                        {/* Academic Information */}
                        <div className="bg-stone-800/50 rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-stone-700/50">
                                <h2 className="text-xl font-semibold text-stone-200">Academic Information</h2>
                            </div>
                            <InfoItem icon={Hash} label="Student ID" value={student.academicInfo.studentId} />
                            <InfoItem icon={Hash} label="CNE/MASSAR" value={student.academicInfo.cneNumber} />
                            <InfoItem icon={School} label="Level" value={student.academicInfo.level} />
                            <InfoItem icon={School} label="Major" value={student.academicInfo.major} />
                        </div>

                        {/* Contact Information */}
                        <div className="bg-stone-800/50 rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-stone-700/50">
                                <h2 className="text-xl font-semibold text-stone-200">Contact Information</h2>
                            </div>
                            {editingEmail ? (
                                <div className="flex items-center justify-between p-4 gap-4 border-b border-stone-700/50">
                                    <div className="flex items-center gap-3 flex-grow">
                                        <Mail className="w-5 h-5 text-[#8B4513]" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full p-2 rounded bg-stone-700 text-stone-200 border-none focus:ring-2 focus:ring-[#8B4513]"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleSave('email')} className="p-2 text-green-500 hover:bg-green-500 hover:text-stone-200 rounded-full transition-colors">
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => setEditingEmail(false)} className="p-2 text-red-500 hover:bg-red-500 hover:text-stone-200 rounded-full transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <InfoItem icon={Mail} label="Email" value={email} editable onEdit={() => setEditingEmail(true)} />
                            )}
                            {editingPhone ? (
                                <div className="flex items-center justify-between p-4 gap-4">
                                    <div className="flex items-center gap-3 flex-grow">
                                        <Phone className="w-5 h-5 text-[#8B4513]" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full p-2 rounded bg-stone-700 text-stone-200 border-none focus:ring-2 focus:ring-[#8B4513]"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleSave('phone')} className="p-2 text-green-500 hover:bg-green-500 hover:text-stone-200 rounded-full transition-colors">
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => setEditingPhone(false)} className="p-2 text-red-500 hover:bg-red-500 hover:text-stone-200 rounded-full transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <InfoItem icon={Phone} label="Phone" value={phone || 'Not provided'} editable onEdit={() => setEditingPhone(true)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}