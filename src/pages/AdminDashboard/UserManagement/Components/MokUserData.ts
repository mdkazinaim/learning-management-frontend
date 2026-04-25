interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  enrolledCourses: number;
  progress: number;
  profile?: UserProfile;
}
interface UserProfile {
  fullName: string;
  email: string;
  registrationDate: string;
  status: "Active" | "Inactive";
  courses: {
    title: string;
    completion: number;
  }[];
}
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "jane.doe@example.com",
    status: "Active",
    enrolledCourses: 4,
    progress: 50,
    profile: {
      fullName: "John Doe",
      email: "johndoe@gmail.com",
      registrationDate: "2024-01-15",
      status: "Active",
      courses: [
        { title: "Leadership Training", completion: 85 },
        { title: "Customer Service Excellence", completion: 60 },
        { title: "Time Management", completion: 45 },
      ],
    },
  },
  {
    id: 2,
    name: "Emily Carter",
    email: "john.smith@example.com",
    status: "Active",
    enrolledCourses: 15,
    progress: 50,
  },
  {
    id: 3,
    name: "Michael Smith",
    email: "alice.jones@example.com",
    status: "Active",
    enrolledCourses: 7,
    progress: 50,
  },
  {
    id: 4,
    name: "Sophia Brown",
    email: "bob.brown@example.com",
    status: "Inactive",
    enrolledCourses: 3,
    progress: 50,
  },
  {
    id: 5,
    name: "Liam Davis",
    email: "charlie.white@example.com",
    status: "Active",
    enrolledCourses: 6,
    progress: 50,
  },
  {
    id: 6,
    name: "Olivia Wilson",
    email: "david.green@example.com",
    status: "Active",
    enrolledCourses: 3,
    progress: 50,
  },
  {
    id: 7,
    name: "James Taylor",
    email: "eve.black@example.com",
    status: "Inactive",
    enrolledCourses: 8,
    progress: 50,
  },
  {
    id: 8,
    name: "Isabella Martinez",
    email: "frank.blue@example.com",
    status: "Active",
    enrolledCourses: 6,
    progress: 50,
  },
  {
    id: 9,
    name: "Ethan Anderson",
    email: "grace.red@example.com",
    status: "Inactive",
    enrolledCourses: 11,
    progress: 50,
  },
  {
    id: 10,
    name: "Ethan Anderson",
    email: "iris.yellow@example.com",
    status: "Inactive",
    enrolledCourses: 11,
    progress: 50,
  },
  {
    id: 11,
    name: "Ethan Anderson",
    email: "jack.orange@example.com",
    status: "Inactive",
    enrolledCourses: 11,
    progress: 50,
  },
  {
    id: 12,
    name: "Ava Thomas",
    email: "hank.purple@example.com",
    status: "Active",
    enrolledCourses: 9,
    progress: 50,
  },
  {
    id: 13,
    name: "Noah Garcia",
    email: "noah.garcia@example.com",
    status: "Active",
    enrolledCourses: 5,
    progress: 50,
  },
  {
    id: 14,
    name: "Chloe Miller",
    email: "chloe.miller@example.com",
    status: "Inactive",
    enrolledCourses: 2,
    progress: 50,
  },
  {
    id: 15,
    name: "Benjamin Lee",
    email: "benjamin.lee@example.com",
    status: "Active",
    enrolledCourses: 8,
    progress: 50,
  },
  {
    id: 16,
    name: "Zoe Walker",
    email: "zoe.walker@example.com",
    status: "Active",
    enrolledCourses: 4,
    progress: 50,
  },
  {
    id: 17,
    name: "Lucas Hall",
    email: "lucas.hall@example.com",
    status: "Inactive",
    enrolledCourses: 7,
    progress: 50,
  },
  {
    id: 18,
    name: "Mia Allen",
    email: "mia.allen@example.com",
    status: "Active",
    enrolledCourses: 6,
    progress: 50,
  },
  {
    id: 19,
    name: "Henry Young",
    email: "henry.young@example.com",
    status: "Inactive",
    enrolledCourses: 9,
    progress: 50,
  },
  {
    id: 20,
    name: "Lily King",
    email: "lily.king@example.com",
    status: "Active",
    enrolledCourses: 3,
    progress: 50,
  },
  {
    id: 21,
    name: "Jack Wright",
    email: "jack.wright@example.com",
    status: "Active",
    enrolledCourses: 5,
    progress: 50,
  },
  {
    id: 22,
    name: "Grace Scott",
    email: "grace.scott@example.com",
    status: "Inactive",
    enrolledCourses: 4,
    progress: 50,
  },
  {
    id: 23,
    name: "Owen Green",
    email: "owen.green@example.com",
    status: "Active",
    enrolledCourses: 7,
    progress: 50,
  },
  {
    id: 24,
    name: "Hannah Baker",
    email: "hannah.baker@example.com",
    status: "Active",
    enrolledCourses: 2,
    progress: 50,
  },
  {
    id: 25,
    name: "Gabriel Adams",
    email: "gabriel.adams@example.com",
    status: "Inactive",
    enrolledCourses: 6,
    progress: 50,
  },
];