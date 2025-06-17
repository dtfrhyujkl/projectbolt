export interface MedicalCollege {
  name: string;
  city: string;
  type: 'Government' | 'Private' | 'Deemed';
}

export const medicalCollegesByState: Record<string, MedicalCollege[]> = {
  'Andhra Pradesh': [
    { name: 'Andhra Medical College', city: 'Visakhapatnam', type: 'Government' },
    { name: 'Guntur Medical College', city: 'Guntur', type: 'Government' },
    { name: 'Kurnool Medical College', city: 'Kurnool', type: 'Government' },
    { name: 'Rangaraya Medical College', city: 'Kakinada', type: 'Government' },
    { name: 'Siddhartha Medical College', city: 'Vijayawada', type: 'Private' },
    { name: 'Sri Venkateswara Medical College', city: 'Tirupati', type: 'Government' },
    { name: 'Narayana Medical College', city: 'Nellore', type: 'Private' }
  ],
  'Assam': [
    { name: 'Assam Medical College', city: 'Dibrugarh', type: 'Government' },
    { name: 'Gauhati Medical College', city: 'Guwahati', type: 'Government' },
    { name: 'Silchar Medical College', city: 'Silchar', type: 'Government' },
    { name: 'Jorhat Medical College', city: 'Jorhat', type: 'Government' },
    { name: 'Tezpur Medical College', city: 'Tezpur', type: 'Government' }
  ],
  'Bihar': [
    { name: 'Patna Medical College', city: 'Patna', type: 'Government' },
    { name: 'Darbhanga Medical College', city: 'Darbhanga', type: 'Government' },
    { name: 'Nalanda Medical College', city: 'Patna', type: 'Government' },
    { name: 'Anugrah Narayan Magadh Medical College', city: 'Gaya', type: 'Government' },
    { name: 'Jawaharlal Nehru Medical College', city: 'Bhagalpur', type: 'Government' }
  ],
  'Chhattisgarh': [
    { name: 'Pt. J.N.M. Medical College', city: 'Raipur', type: 'Government' },
    { name: 'Government Medical College', city: 'Rajnandgaon', type: 'Government' },
    { name: 'Late Baliram Kashyap Memorial Medical College', city: 'Jagdalpur', type: 'Government' }
  ],
  'Delhi': [
    { name: 'All India Institute of Medical Sciences (AIIMS)', city: 'New Delhi', type: 'Government' },
    { name: 'Lady Hardinge Medical College', city: 'New Delhi', type: 'Government' },
    { name: 'Maulana Azad Medical College', city: 'New Delhi', type: 'Government' },
    { name: 'University College of Medical Sciences', city: 'New Delhi', type: 'Government' },
    { name: 'Vardhman Mahavir Medical College', city: 'New Delhi', type: 'Government' },
    { name: 'Jamia Hamdard', city: 'New Delhi', type: 'Deemed' }
  ],
  'Gujarat': [
    { name: 'B.J. Medical College', city: 'Ahmedabad', type: 'Government' },
    { name: 'Government Medical College', city: 'Surat', type: 'Government' },
    { name: 'Government Medical College', city: 'Baroda', type: 'Government' },
    { name: 'M.P. Shah Medical College', city: 'Jamnagar', type: 'Government' },
    { name: 'Smt. N.H.L. Municipal Medical College', city: 'Ahmedabad', type: 'Government' },
    { name: 'Pramukhswami Medical College', city: 'Karamsad', type: 'Private' }
  ],
  'Haryana': [
    { name: 'Pt. B.D. Sharma PGIMS', city: 'Rohtak', type: 'Government' },
    { name: 'Government Medical College', city: 'Chandigarh', type: 'Government' },
    { name: 'Maharaja Agrasen Medical College', city: 'Agroha', type: 'Private' },
    { name: 'SGT Medical College', city: 'Gurugram', type: 'Private' }
  ],
  'Himachal Pradesh': [
    { name: 'Indira Gandhi Medical College', city: 'Shimla', type: 'Government' },
    { name: 'Dr. Rajendra Prasad Government Medical College', city: 'Tanda', type: 'Government' }
  ],
  'Jharkhand': [
    { name: 'Rajendra Institute of Medical Sciences', city: 'Ranchi', type: 'Government' },
    { name: 'Mahatma Gandhi Memorial Medical College', city: 'Jamshedpur', type: 'Government' },
    { name: 'Phulo Jhano Medical College', city: 'Dumka', type: 'Government' }
  ],
  'Karnataka': [
    { name: 'Bangalore Medical College', city: 'Bangalore', type: 'Government' },
    { name: 'Mysore Medical College', city: 'Mysore', type: 'Government' },
    { name: 'Karnataka Institute of Medical Sciences', city: 'Hubli', type: 'Government' },
    { name: 'J.J.M. Medical College', city: 'Davangere', type: 'Government' },
    { name: 'St. John\'s Medical College', city: 'Bangalore', type: 'Private' },
    { name: 'Kasturba Medical College', city: 'Mangalore', type: 'Private' },
    { name: 'M.S. Ramaiah Medical College', city: 'Bangalore', type: 'Private' }
  ],
  'Kerala': [
    { name: 'Government Medical College', city: 'Thiruvananthapuram', type: 'Government' },
    { name: 'Government Medical College', city: 'Kozhikode', type: 'Government' },
    { name: 'Government Medical College', city: 'Kottayam', type: 'Government' },
    { name: 'Government Medical College', city: 'Thrissur', type: 'Government' },
    { name: 'Amrita Institute of Medical Sciences', city: 'Kochi', type: 'Private' },
    { name: 'Jubilee Mission Medical College', city: 'Thrissur', type: 'Private' }
  ],
  'Madhya Pradesh': [
    { name: 'Gandhi Medical College', city: 'Bhopal', type: 'Government' },
    { name: 'Mahatma Gandhi Memorial Medical College', city: 'Indore', type: 'Government' },
    { name: 'Netaji Subhash Chandra Bose Medical College', city: 'Jabalpur', type: 'Government' },
    { name: 'Gajra Raja Medical College', city: 'Gwalior', type: 'Government' },
    { name: 'All India Institute of Medical Sciences', city: 'Bhopal', type: 'Government' }
  ],
  'Maharashtra': [
    { name: 'Grant Government Medical College', city: 'Mumbai', type: 'Government' },
    { name: 'King Edward Memorial Hospital', city: 'Mumbai', type: 'Government' },
    { name: 'Seth G.S. Medical College', city: 'Mumbai', type: 'Government' },
    { name: 'B.J. Government Medical College', city: 'Pune', type: 'Government' },
    { name: 'Government Medical College', city: 'Nagpur', type: 'Government' },
    { name: 'Armed Forces Medical College', city: 'Pune', type: 'Government' },
    { name: 'Bharati Vidyapeeth Medical College', city: 'Pune', type: 'Private' },
    { name: 'D.Y. Patil Medical College', city: 'Pune', type: 'Private' }
  ],
  'Odisha': [
    { name: 'S.C.B. Medical College', city: 'Cuttack', type: 'Government' },
    { name: 'M.K.C.G. Medical College', city: 'Berhampur', type: 'Government' },
    { name: 'V.S.S. Medical College', city: 'Burla', type: 'Government' },
    { name: 'All India Institute of Medical Sciences', city: 'Bhubaneswar', type: 'Government' }
  ],
  'Punjab': [
    { name: 'Government Medical College', city: 'Amritsar', type: 'Government' },
    { name: 'Government Medical College', city: 'Patiala', type: 'Government' },
    { name: 'Dayanand Medical College', city: 'Ludhiana', type: 'Private' },
    { name: 'Christian Medical College', city: 'Ludhiana', type: 'Private' }
  ],
  'Rajasthan': [
    { name: 'S.M.S. Medical College', city: 'Jaipur', type: 'Government' },
    { name: 'Dr. S.N. Medical College', city: 'Jodhpur', type: 'Government' },
    { name: 'R.N.T. Medical College', city: 'Udaipur', type: 'Government' },
    { name: 'S.P. Medical College', city: 'Bikaner', type: 'Government' },
    { name: 'All India Institute of Medical Sciences', city: 'Jodhpur', type: 'Government' }
  ],
  'Tamil Nadu': [
    { name: 'Madras Medical College', city: 'Chennai', type: 'Government' },
    { name: 'Stanley Medical College', city: 'Chennai', type: 'Government' },
    { name: 'Kilpauk Medical College', city: 'Chennai', type: 'Government' },
    { name: 'Thanjavur Medical College', city: 'Thanjavur', type: 'Government' },
    { name: 'Tirunelveli Medical College', city: 'Tirunelveli', type: 'Government' },
    { name: 'Christian Medical College', city: 'Vellore', type: 'Private' },
    { name: 'Sri Ramachandra Medical College', city: 'Chennai', type: 'Private' }
  ],
  'Telangana': [
    { name: 'Osmania Medical College', city: 'Hyderabad', type: 'Government' },
    { name: 'Gandhi Medical College', city: 'Secunderabad', type: 'Government' },
    { name: 'Kakatiya Medical College', city: 'Warangal', type: 'Government' },
    { name: 'Deccan College of Medical Sciences', city: 'Hyderabad', type: 'Private' }
  ],
  'Uttar Pradesh': [
    { name: 'King George\'s Medical University', city: 'Lucknow', type: 'Government' },
    { name: 'Institute of Medical Sciences, BHU', city: 'Varanasi', type: 'Government' },
    { name: 'Maulana Azad Medical College', city: 'New Delhi', type: 'Government' },
    { name: 'All India Institute of Medical Sciences', city: 'Rishikesh', type: 'Government' },
    { name: 'Era\'s Lucknow Medical College', city: 'Lucknow', type: 'Private' }
  ],
  'West Bengal': [
    { name: 'Medical College', city: 'Kolkata', type: 'Government' },
    { name: 'R.G. Kar Medical College', city: 'Kolkata', type: 'Government' },
    { name: 'N.R.S. Medical College', city: 'Kolkata', type: 'Government' },
    { name: 'Burdwan Medical College', city: 'Burdwan', type: 'Government' },
    { name: 'North Bengal Medical College', city: 'Siliguri', type: 'Government' },
    { name: 'All India Institute of Medical Sciences', city: 'Kalyani', type: 'Government' }
  ]
};

export const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
  'Andaman and Nicobar Islands'
];