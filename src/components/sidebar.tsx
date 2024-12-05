import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import axios from 'axios';
import PatientInfo from "./patient-info";
import { useState, useEffect } from 'react';
import MainContent from "./main-content";

const username = 'coalition';
const password = 'skills-test';
const auth = btoa(`${username}:${password}`);

interface Patient {
  name: string;
  gender: string;
  age: number;
  image: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history:[{
  month: string;
  year: number;
  blood_pressure: {
      systolic : {
          value: number,
          levels: string
      },
      diastolic: {
          value: number,
          levels: string
      }
  },
  heart_rate: {
      value: number,
      levels: string
  },
  respiratory_rate: {
      value: number,
      levels: string
  },
  temperature: {
      value: number,
      levels: string
  }
}]
}

interface diagnose {
  month: string;
  year: number;
  blood_pressure: {
      systolic : {
          value: number,
          levels: string
      },
      diastolic: {
          value: number,
          levels: string
      }
  },
  heart_rate: {
      value: number,
      levels: string
  },
  respiratory_rate: {
      value: number,
      levels: string
  },
  temperature: {
      value: number,
      levels: string
  }
}

interface ApiResponse {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history:[{
    month: string;
    year: number;
    blood_pressure: {
        systolic : {
            value: number,
            levels: string
        },
        diastolic: {
            value: number,
            levels: string
        }
    },
    heart_rate: {
        value: number,
        levels: string
    },
    respiratory_rate: {
        value: number,
        levels: string
    },
    temperature: {
        value: number,
        levels: string
    }
  }]
}
const pati = {
  "name": "Emily Williams",
  "gender": "Female",
  "age": 18,
  "image": "https://fedskillstest.ct.digital/1.png",
  "date_of_birth": "2006-08-19",
  "phone_number": "(711) 984-6696",
  "emergency_contact": "(680) 653-9512",
  "insurance_type": "Premier Auto Corporation",
  "diagnosis_history": [
      {
          "month": "March",
          "year": 2024,
          "blood_pressure": {
              "systolic": {
                  "value": 163,
                  "levels": "Higher than Average"
              },
              "diastolic": {
                  "value": 95,
                  "levels": "Normal"
              }
          },
          "heart_rate": {
              "value": 79,
              "levels": "Lower than Average"
          },
          "respiratory_rate": {
              "value": 27,
              "levels": "Normal"
          },
          "temperature": {
              "value": 103,
              "levels": "Higher than Average"
          }
      },
      {
          "month": "February",
          "year": 2024,
          "blood_pressure": {
              "systolic": {
                  "value": 151,
                  "levels": "Higher than Average"
              },
              "diastolic": {
                  "value": 120,
                  "levels": "Normal"
              }
          },
          "heart_rate": {
              "value": 88,
              "levels": "Normal"
          },
          "respiratory_rate": {
              "value": 27,
              "levels": "Normal"
          },
          "temperature": {
              "value": 99,
              "levels": "Normal"
          }
      },
      {
          "month": "January",
          "year": 2024,
          "blood_pressure": {
              "systolic": {
                  "value": 168,
                  "levels": "Higher than Average"
              },
              "diastolic": {
                  "value": 77,
                  "levels": "Lower than Average"
              }
          },
          "heart_rate": {
              "value": 82,
              "levels": "Normal"
          },
          "respiratory_rate": {
              "value": 17,
              "levels": "Normal"
          },
          "temperature": {
              "value": 97,
              "levels": "Normal"
          }
      },
      {
          "month": "December",
          "year": 2023,
          "blood_pressure": {
              "systolic": {
                  "value": 158,
                  "levels": "Higher than Average"
              },
              "diastolic": {
                  "value": 92,
                  "levels": "Normal"
              }
          },
          "heart_rate": {
              "value": 60,
              "levels": "Lower than Average"
          },
          "respiratory_rate": {
              "value": 21,
              "levels": "Normal"
          },
          "temperature": {
              "value": 99,
              "levels": "Normal"
          }
      },
      {
          "month": "November",
          "year": 2023,
          "blood_pressure": {
              "systolic": {
                  "value": 117,
                  "levels": "Normal"
              },
              "diastolic": {
                  "value": 95,
                  "levels": "Normal"
              }
          },
          "heart_rate": {
              "value": 100,
              "levels": "Normal"
          },
          "respiratory_rate": {
              "value": 21,
              "levels": "Normal"
          },
          "temperature": {
              "value": 103,
              "levels": "Higher than Average"
          }
      },
      {
          "month": "October",
          "year": 2023,
          "blood_pressure": {
              "systolic": {
                  "value": 115,
                  "levels": "Normal"
              },
              "diastolic": {
                  "value": 80,
                  "levels": "Lower than Average"
              }
          },
          "heart_rate": {
              "value": 63,
              "levels": "Lower than Average"
          },
          "respiratory_rate": {
              "value": 14,
              "levels": "Normal"
          },
          "temperature": {
              "value": 100,
              "levels": "Normal"
          }
      },
      {
          "month": "September",
          "year": 2023,
          "blood_pressure": {
              "systolic": {
                  "value": 133,
                  "levels": "Higher than Average"
              },
              "diastolic": {
                  "value": 68,
                  "levels": "Lower than Average"
              }
          },
          "heart_rate": {
              "value": 91,
              "levels": "Normal"
          },
          "respiratory_rate": {
              "value": 13,
              "levels": "Normal"
          },
          "temperature": {
              "value": 99,
              "levels": "Normal"
          }
      },
      {
          "month": "August",
          "year": 2023,
          "blood_pressure": {
              "systolic": {
                  "value": 149,
                  "levels": "Higher than Average"
              },
              "diastolic": {
                  "value": 70,
                  "levels": "Lower than Average"
              }
          },
          "heart_rate": {
              "value": 69,
              "levels": "Lower than Average"
          },
          "respiratory_rate": {
              "value": 14,
              "levels": "Normal"
          },
          "temperature": {
              "value": 100,
              "levels": "Normal"
          }
      },
      {
          "month": "July",
          "year": 2023,
          "blood_pressure": {
              "systolic": {
                  "value": 165,
                  "levels": "Higher than Average"
              },
              "diastolic": {
                  "value": 95,
                  "levels": "Normal"
              }
          },
          "heart_rate": {
              "value": 71,
              "levels": "Lower than Average"
          },
          "respiratory_rate": {
              "value": 14,
              "levels": "Normal"
          },
          "temperature": {
              "value": 100,
              "levels": "Normal"
          }
      }
  ]
}
const diagnosis= [
            {
                "month": "March",
                "year": 2024,
                "blood_pressure": {
                    "systolic": {
                        "value": 163,
                        "levels": "Higher than Average"
                    },
                    "diastolic": {
                        "value": 95,
                        "levels": "Normal"
                    }
                },
                "heart_rate": {
                    "value": 79,
                    "levels": "Lower than Average"
                },
                "respiratory_rate": {
                    "value": 27,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 103,
                    "levels": "Higher than Average"
                }
            },
            {
                "month": "February",
                "year": 2024,
                "blood_pressure": {
                    "systolic": {
                        "value": 151,
                        "levels": "Higher than Average"
                    },
                    "diastolic": {
                        "value": 120,
                        "levels": "Normal"
                    }
                },
                "heart_rate": {
                    "value": 88,
                    "levels": "Normal"
                },
                "respiratory_rate": {
                    "value": 27,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 99,
                    "levels": "Normal"
                }
            },
            {
                "month": "January",
                "year": 2024,
                "blood_pressure": {
                    "systolic": {
                        "value": 168,
                        "levels": "Higher than Average"
                    },
                    "diastolic": {
                        "value": 77,
                        "levels": "Lower than Average"
                    }
                },
                "heart_rate": {
                    "value": 82,
                    "levels": "Normal"
                },
                "respiratory_rate": {
                    "value": 17,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 97,
                    "levels": "Normal"
                }
            },
            {
                "month": "December",
                "year": 2023,
                "blood_pressure": {
                    "systolic": {
                        "value": 158,
                        "levels": "Higher than Average"
                    },
                    "diastolic": {
                        "value": 92,
                        "levels": "Normal"
                    }
                },
                "heart_rate": {
                    "value": 60,
                    "levels": "Lower than Average"
                },
                "respiratory_rate": {
                    "value": 21,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 99,
                    "levels": "Normal"
                }
            },
            {
                "month": "November",
                "year": 2023,
                "blood_pressure": {
                    "systolic": {
                        "value": 117,
                        "levels": "Normal"
                    },
                    "diastolic": {
                        "value": 95,
                        "levels": "Normal"
                    }
                },
                "heart_rate": {
                    "value": 100,
                    "levels": "Normal"
                },
                "respiratory_rate": {
                    "value": 21,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 103,
                    "levels": "Higher than Average"
                }
            },
            {
                "month": "October",
                "year": 2023,
                "blood_pressure": {
                    "systolic": {
                        "value": 115,
                        "levels": "Normal"
                    },
                    "diastolic": {
                        "value": 80,
                        "levels": "Lower than Average"
                    }
                },
                "heart_rate": {
                    "value": 63,
                    "levels": "Lower than Average"
                },
                "respiratory_rate": {
                    "value": 14,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 100,
                    "levels": "Normal"
                }
            },
            {
                "month": "September",
                "year": 2023,
                "blood_pressure": {
                    "systolic": {
                        "value": 133,
                        "levels": "Higher than Average"
                    },
                    "diastolic": {
                        "value": 68,
                        "levels": "Lower than Average"
                    }
                },
                "heart_rate": {
                    "value": 91,
                    "levels": "Normal"
                },
                "respiratory_rate": {
                    "value": 13,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 99,
                    "levels": "Normal"
                }
            },
            {
                "month": "August",
                "year": 2023,
                "blood_pressure": {
                    "systolic": {
                        "value": 149,
                        "levels": "Higher than Average"
                    },
                    "diastolic": {
                        "value": 70,
                        "levels": "Lower than Average"
                    }
                },
                "heart_rate": {
                    "value": 69,
                    "levels": "Lower than Average"
                },
                "respiratory_rate": {
                    "value": 14,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 100,
                    "levels": "Normal"
                }
            },
            {
                "month": "July",
                "year": 2023,
                "blood_pressure": {
                    "systolic": {
                        "value": 165,
                        "levels": "Higher than Average"
                    },
                    "diastolic": {
                        "value": 95,
                        "levels": "Normal"
                    }
                },
                "heart_rate": {
                    "value": 71,
                    "levels": "Lower than Average"
                },
                "respiratory_rate": {
                    "value": 14,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 100,
                    "levels": "Normal"
                }
            }
        ]
export default function Sidebar() {
  const [Patient, setPatient] = useState<Patient | null>(pati);
  const [info, setInfo] = useState<diagnose[]>(diagnosis);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await axios.get("https://fedskillstest.coalitiontechnologies.workers.dev", {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });
      
      console.log("API Response:", response.data);
      
      setPatients(response.data.map((item: ApiResponse): Patient => ({
        name: item.name,
        gender: item.gender,
        age: item.age,
        image: item.profile_picture,
        date_of_birth: item.date_of_birth,
        diagnosis_history: item.diagnosis_history,
        phone_number: item.phone_number,
        emergency_contact: item.emergency_contact,
        insurance_type: item.insurance_type,
      })));
    };

    fetchPatients();
}, []);
 

//   // Add interface for patient type
//   interface Patient {
//     name: string;
//     gender: string;
//     age: number;
//     image: string;
//     date_of_birth: string;
//   }

//   // Update the map with type
//   interface ApiResponse {
//     name: string;
//     gender: string;
//     age: number;
//     profile_picture: string;
//     date_of_birth: string;
//   }


  return (
    <div className="flex">
      <div className="w-64 border-r bg-white p-4">
        <h2 className="text-xl font-semibold mb-4">Patients</h2>
        <Input type="search" placeholder="Search..." className="mb-4" />
        <ScrollArea className="h-[calc(100vh-12rem)]">
          {patients.map((patient: Patient, index: number) => (
            <Button
              key={index} 
              onClick={() => {
                setPatient(patient);
                setInfo(patient.diagnosis_history);
              }}
              className="bg-transparent h-full w-full"
            >
              <div className={`flex items-center space-x-4 p-2 rounded-lg}`}>
                <Avatar>
                  <AvatarImage src={patient.image} alt={patient.name} />
                  <AvatarFallback>{patient.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-500">{patient.name}</p>
                  <p className="text-sm text-gray-500">{patient.gender}, {patient.age}</p>
                </div>
              </div>
            </Button>
          ))}
        </ScrollArea>
      </div>
      <div className="flex-2 w-full">
      {info && <MainContent info={info} />}
      </div>
      <div className="flex-1 w-[400px]">
      {Patient && <PatientInfo patient={Patient} />}
      </div> 
    </div>
  )
}


