

import {Hostel} from "../models/hostel.js" // Adjust this path based on your folder structure



// 1. Add a new hostel
export const addHostel = async (req, res) => {
  const {
    name, city, locality, landmark, fullAddress, type,images,videos, occupancy,
     amenities, services, description, policyHouseRules, coordinates, foodMenu, studentTypes
  } = req.body;

  // take the images 

  // take the videos 

  try {
    // Create a new hostel document
    const newHostel = new Hostel({
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
    // Save the hostel in the database
    await newHostel.save();
    res.status(201).json({ hostel: newHostel });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};




// 2. Delete hostel data by ID
export const deleteHostel = async (req, res) => {
  const { id } = req.params; // Hostel ID

  try {
    // Find the hostel by ID and delete it
    const deletedHostel = await Hostel.findByIdAndDelete(id);

    if (!deletedHostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    res.status(200).json({ message: 'Hostel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};




// 3. Update hostel data
export const updateHostel = async (req, res) => {
  const { id } = req.params; // Hostel ID
  const updatedData = req.body; // Updated fields sent from the client

  try {
    // Find the hostel by ID and update it with the provided data
    const updatedHostel = await Hostel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedHostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    res.status(200).json({ hostel: updatedHostel });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};




// 4. Get hostels by filters
export const getHostelsByFilters = async (req, res) => {
  const { city, locality, priceMin, priceMax, type, amenities } = req.query; // Filters from query params

  try {
    // Build the query object dynamically based on the provided filters
    let filters = {};
    if (city) filters.city = city;
    if (locality) filters.locality = locality;
    if (type) filters.type = type;
    if (amenities) filters.amenities = { $all: amenities.split(',') }; // Matches all amenities in the list

    if (priceMin && priceMax) {
      filters['occupancy.price'] = { $gte: priceMin, $lte: priceMax }; // Filter based on price range
    }

    // Query the database for hostels matching the filters
    const hostels = await Hostel.find(filters);

    res.status(200).json({ hostels });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// 5. Get hostel by ID
export const getHostelById = async (req, res) => {
  const { id } = req.params; // Hostel ID

  try {
    // Find hostel by ID
    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    res.status(200).json({ message:"Hosel found Successfully",
         hostel });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
