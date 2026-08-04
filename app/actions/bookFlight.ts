"use server";

import { supabase } from "@/lib/supabase";

export async function bookFlight(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const destination = formData.get("destination") as string;
  const travelDate = formData.get("travelDate") as string;
  const requirements = formData.get("requirements") as string;

  if (!name || !email || !destination || !travelDate) {
    return { error: "Please fill in all required fields." };
  }

  const { error } = await supabase.from("bookings").insert([
    {
      name,
      email,
      destination,
      travel_date: travelDate,
      requirements,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return { error: "Failed to submit booking. Please try again later." };
  }

  return { success: true };
}
