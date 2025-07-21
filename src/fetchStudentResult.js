// fetchStudentResult.js
import { supabase } from "./supabaseClient";
export async function fetchStudentResult(student_id) {
  // Query all rows with the matching student_id
  const { data, error } = await supabase
    .from("student_results")
    .select("*")
    .eq("student_id", student_id);
  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data;
}