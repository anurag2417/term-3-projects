import { useState, useEffect } from "react";
import { BLOOD_GROUP_LIST } from "../data/bloodGroups";

const useDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDonors = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const users = await res.json();

        const cities = [
          "Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad",
          "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Surat"
        ];

        const mapped = users.map((user, index) => ({
          id: user.id,
          name: user.name,
          bloodGroup: BLOOD_GROUP_LIST[index % BLOOD_GROUP_LIST.length],
          city: cities[index % cities.length],
          available: Math.random() > 0.3,
          email: user.email,
          phone: user.phone,
        }));

        if (isMounted) {
          setDonors(mapped);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDonors();

    return () => {
      isMounted = false;
    };
  }, []);

  return { donors, loading, error };
};

export default useDonors;