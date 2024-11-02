import { Hostel } from "../models/hostel.js";

// 1. Add a new hostel
export const addHostel = async (req, res) => {
  const {
    name,
    city,
    locality,
    landmark,
    fullAddress,
    type,
    occupancy,
    amenities,
    services,
    description,
    policyHouseRules,
    coordinates,
    foodMenu,
    studentTypes,
    images,
    videos,
  } = req.body;
  console.log("body ", req.body);
  try {
    // Create a new hostel document
    const newHostel = await Hostel.create({
      name,
      city,
      locality,
      landmark,
      fullAddress,
      type,
      images,
      videos,
      occupancy,
      amenities,
      services,
      description,
      policyHouseRules,
      coordinates,
      foodMenu,
      studentTypes,
      owner: req.Id, // Assuming you have the owner's ID stored in req.user (JWT)
    });

    console.log("New Hsotel", newHostel);
    res.status(201).json({
      hostel: newHostel,
      message: "Hostel details saved successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// 2. Delete hostel data by ID
export const deleteHostel = async (req, res) => {
  const { id } = req.params; // Hostel ID

  try {
    // Find the hostel by ID and delete it
    const deletedHostel = await Hostel.findByIdAndDelete(id);

    if (!deletedHostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    res.status(200).json({ message: "Hostel deleted successfully" });
  } catch (error) {
    console.error("Detailed error in addHostel function:", error); // Add this
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// 3. Update hostel data
export const updateHostel = async (req, res) => {
  const hostelId = req.body.id.id;
  const inputdata = req.body; // Updated fields sent from the client

  try {
    // Find the hostel by ID and update it with the provided data
    const updatedHostel = await Hostel.findByIdAndUpdate(hostelId, inputdata, {
      new: true,
    });
    if (!updatedHostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    res.status(200).json({
      hostel: updatedHostel,
      message: "Successfully updated the hostel details",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get hostels by filters
export const getHostelsByFilters = async (req, res) => {
  const {
    name,
    city,
    locality,
    landmark,
    type,
    amenities,
    services,
    occupancy,
    priceMin,
    priceMax,
    studentType,
  } = req.query;
   
  console.log("req query : ", req.query);
  try {
    let filters = {};
    if (name) filters.name = new RegExp(name, "i");
    if (city) filters.city = city;
    if (locality) filters.locality = locality;
    if (landmark) filters.landmark = landmark;
    if (type && type !== "all") filters.type = type;
    if (occupancy) filters.occupancy = occupancy;
    if (amenities) filters.amenities = { $regex: amenities, $options: "i" };
    if (services) filters.services = { $regex: services, $options: "i" };
    if (priceMin && priceMax)
      filters["occupancy.price"] = { $gte: priceMin, $lte: priceMax };

    if (studentType) {
      filters["studentTypes.type"] = { $regex: studentType, $options: "i" };
    }
    
    console.log("Filters : ", filters);

    const hostels = await Hostel.find(filters);

    console.log("Hostels list: ", hostels);
    res.status(200).json({
       hostels,
       message: "Hostels fetched successfully"
       });
  } catch (error) {
    res.status(500).json({ 
      message: "Something went wrong",
      error });
  }
};

// 5. Get hostel by ID
export const getHostelById = async (req, res) => {
  const { id } = req.params; // Hostel ID

  try {
    // Find hostel by ID
    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    res.status(200).json({ message: "Hosel found Successfully", hostel });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
