// types/index.ts
export interface User {
    id: number;
    name: string;
    email: string;
    address: {
      street: string;
      city: string;
    };
    // Add more fields as needed based on the JSONPlaceholder API or your chosen API
  }

  // Assuming Photo type
export interface Photo {
  id: number;
  src: {
    original: string;
    // Add other source properties as needed
  };
  // Add other photo properties as needed
}



// UserData.ts
interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default UserData;

