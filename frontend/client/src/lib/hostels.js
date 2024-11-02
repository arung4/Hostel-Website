const hostels = [
    {
      name: "Sunrise Hostel",
      city: "Mumbai",
      locality: "Andheri West",
      landmark: "Near Infinity Mall",
      fullAddress: "15A, Andheri West, Mumbai, Maharashtra",
      type: "male",
      images: [
        "https://example.com/sunrise-hostel1.jpg",
        "https://example.com/sunrise-hostel2.jpg"
      ],
      videos: ["https://example.com/sunrise-tour.mp4"],
      occupancy: [
        { type: "single", price: 8000, roomsAvailable: 4, roomSize: "12x12 ft" },
        { type: "double", price: 6000, roomsAvailable: 8, roomSize: "15x15 ft" },
        { type: "triple", price: 5000, roomsAvailable: 12, roomSize: "18x18 ft" }
      ],
      amenities: ["WiFi", "Air Conditioning", "Laundry Service", "Gym"],
      services: ["Daily Cleaning", "24x7 Security", "Power Backup"],
      description: "A modern and comfortable hostel located in the heart of Andheri West.",
      policyHouseRules: "No smoking indoors, No pets allowed.",
      coordinates: { latitude: 19.1196, longitude: 72.8465 },
      owner: "633d0f23f12b2a001c8d5d67",
      foodMenu: [
        { day: 1, meals: { breakfast: ["Idli", "Sambar"], lunch: ["Dal", "Rice"], snacks: ["Samosa"], dinner: ["Roti", "Sabzi"] }},
        { day: 2, meals: { breakfast: ["Poha"], lunch: ["Rajma", "Chawal"], snacks: ["Bhel"], dinner: ["Pasta"] }},
        { day: 3, meals: { breakfast: ["Upma"], lunch: ["Paneer Curry", "Rice"], snacks: ["Biscuits"], dinner: ["Pulao"] }}
        // Add data for other days if needed
      ],
      studentTypes: [
        { type: "BTech", count: 15 },
        { type: "MBA", count: 5 }
      ]
    },
    {
      name: "Green Haven",
      city: "Bangalore",
      locality: "Koramangala",
      landmark: "Opposite Forum Mall",
      fullAddress: "45B, Koramangala 5th Block, Bangalore",
      type: "female",
      images: [
        "https://example.com/greenhaven-hostel1.jpg",
        "https://example.com/greenhaven-hostel2.jpg"
      ],
      videos: ["https://example.com/greenhaven-tour.mp4"],
      occupancy: [
        { type: "single", price: 9000, roomsAvailable: 3, roomSize: "10x12 ft" },
        { type: "double", price: 7000, roomsAvailable: 6, roomSize: "12x15 ft" },
        { type: "triple", price: 5500, roomsAvailable: 9, roomSize: "15x18 ft" }
      ],
      amenities: ["WiFi", "Library", "Study Room", "Air Conditioning"],
      services: ["Housekeeping", "Rooftop Access", "Power Backup"],
      description: "A peaceful and homely hostel, perfect for students in Bangalore.",
      policyHouseRules: "Curfew at 10 PM, No loud music after 9 PM.",
      coordinates: { latitude: 12.9344, longitude: 77.6101 },
      owner: "633d0f23f12b2a001c8d5d68",
      foodMenu: [
        { day: 1, meals: { breakfast: ["Dosa"], lunch: ["Veg Biryani"], snacks: ["Sandwich"], dinner: ["Chapati", "Curry"] }},
        { day: 2, meals: { breakfast: ["Oats"], lunch: ["Mixed Veg"], snacks: ["Pakoda"], dinner: ["Fried Rice"] }},
        { day: 3, meals: { breakfast: ["Pancakes"], lunch: ["Kadhi Chawal"], snacks: ["Nachos"], dinner: ["Dosa", "Sambar"] }}
        // Add data for other days if needed
      ],
      studentTypes: [
        { type: "Engineering", count: 12 },
        { type: "MCA", count: 8 }
      ]
    },
    {
      name: "Cityview Hostel",
      city: "Delhi",
      locality: "Karol Bagh",
      landmark: "Near Karol Bagh Metro Station",
      fullAddress: "123, Karol Bagh, New Delhi",
      type: "male",
      images: [
        "https://example.com/cityview-hostel1.jpg",
        "https://example.com/cityview-hostel2.jpg"
      ],
      videos: ["https://example.com/cityview-tour.mp4"],
      occupancy: [
        { type: "single", price: 8500, roomsAvailable: 5, roomSize: "12x12 ft" },
        { type: "double", price: 6200, roomsAvailable: 8, roomSize: "14x14 ft" },
        { type: "triple", price: 5400, roomsAvailable: 10, roomSize: "16x16 ft" }
      ],
      amenities: ["WiFi", "CCTV", "TV Room", "Gym"],
      services: ["Security", "Laundry", "Parking"],
      description: "A well-connected hostel with excellent facilities in the heart of Delhi.",
      policyHouseRules: "No smoking, Quiet hours from 10 PM.",
      coordinates: { latitude: 28.6517, longitude: 77.2314 },
      owner: "633d0f23f12b2a001c8d5d69",
      foodMenu: [
        { day: 1, meals: { breakfast: ["Sandwich"], lunch: ["Chole Bhature"], snacks: ["Fries"], dinner: ["Fried Rice"] }},
        { day: 2, meals: { breakfast: ["Poha"], lunch: ["Dal Tadka", "Rice"], snacks: ["Momos"], dinner: ["Roti", "Vegetables"] }},
        { day: 3, meals: { breakfast: ["Cereal"], lunch: ["Rajma Chawal"], snacks: ["Chips"], dinner: ["Paneer Tikka"] }}
        // Add data for other days if needed
      ],
      studentTypes: [
        { type: "Medical", count: 10 },
        { type: "Law", count: 7 }
      ]
    }
  ];
  
  export default hostels;