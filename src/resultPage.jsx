import { useState } from "react";
import PinInputForm from "./PinInputForm";
import { fetchStudentResult } from "./fetchStudentResult";
import placeholder from "./assets/448226651_3361727037463150_3820847928261531345_n.jpg";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResultPdfDocument from "./ResultPdfDocument";
import placeHolderImg from "./assets/person-placeholder-300x300.jpg";

export default function resultPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePinSubmit = async (pin) => {
    setLoading(true);
    setError("");
    setResult(null);
    const errorMsg = (
      <p className="text-center">
        Invalid PIN or bad internet connection. <br /> Please try again
      </p>
    );
    try {
      const data = await fetchStudentResult(pin);
      if (!data || data.length === 0) {
        setError(errorMsg);
      } else {
        setResult(data[0]);
      }
    } catch (err) {
      setError(errorMsg);
      console.error(err); // log full error to the browser console
    } finally {
      setLoading(false);
    }
  };

  // so if a new subject is added, or for a different class i.e. having different set of subjects or empty subjects, it automatically removes, adds or changes no and names of subjects
  const buildPdfData = (result) => {
    // Dynamically collect all subjects
    const results = [];
    const subjectKeys = Object.keys(result).filter(
      (key) => key.startsWith("subject") && result[key] // filter out empty/null subjects
    );

    subjectKeys.forEach((subjectKey) => {
      const index = subjectKey.replace("subject", "");
      results.push({
        subject: result[`subject${index}`],
        caScore: result[`ca_score${index}`],
        examScore: result[`exam_score${index}`],
        totalScore: result[`total_score${index}`],
        grade: result[`grade${index}`],
        average: result[`average${index}`],
      });
    });

    return {
      schoolInfo: {
        name: "Halal Impact Schools",
        logoUrl: placeholder,
        motto: "Knowledge, Discipline, and Character",
        address: "Impact Avenue, off Zitti Road, Tsaunin Kura, Kaduna",
        phone: "+234 803 704 0204",
        website: "www.halalimpactschool.com.ng",
        email: "halalimpactschools@gmail.com",
      },
      reportMeta: {
        title: "Student Examination Result Sheet",
        term: result.term || "Third Term",
        session: result.session || "2024/2025",
        class: result.class || "JSS 1", // 👈 Only class is used
        next_term_begins: "September 15, 2025",
        classPosition: result.class_position || "N/A",
        no_of_students: result.no_of_students || "N/A",
        averageScore: result.average || "N/A", // Add average score
      },
      studentInfo: {
        studentId: result.student_id,
        studentName: result.student_name,
        passportPhotoUrl: result.passport_url || placeHolderImg,
      },
      principalInfo: {
        name: "Dorcas Linus Midalla",
        // signatureLine: "____________________",
      },
      results: results,
      generatedDate: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      }),
    };
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-screen px-8">
        <div className="flex-col">
          <div className="bg-blue-900 h-20 flex items-center justify-center gap-4 rounded-t-md">
            <img src={placeholder} alt="logo" className="h-10" />
            <h1 className="text-2xl font-bold text-white ">
              Student Result Portal
            </h1>
          </div>
          <div className="bg-gray-100 border-1 border-gray-200 flex flex-col items-center justify-center p-4 rounded-b-md">
            {" "}
            {!result && (
              <>
                <PinInputForm onSubmit={handlePinSubmit} />
                {loading && <p className="mt-4">Loading...</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}
              </>
            )}
            {result && (
              <>
                <div className="py-7">
                  <div>
                    <div className="flex gap-3.5 justify-center flex-wrap">
                      <div
                        id="studentInfoBoxes"
                        className="one border-1 border-gray-200 rounded-md py-5 flex-col items-center min-w-35 min-h-20 "
                      >
                        <h1 className="font-medium text-xs">Student Name</h1>
                        <p className="font-bold text-xl">
                          {result.student_name}
                        </p>
                        <h2 className="font-medium text-xs">
                          Student ID: {result.student_id}
                        </h2>
                      </div>
                      <div
                        id="studentInfoBoxes"
                        className="two border-1 border-gray-200 rounded-md py-5 flex-col items-center min-w-35 min-h-20 "
                      >
                        <h1 className="font-medium text-xs">Class</h1>
                        <p className="font-bold text-xl">{result.class}</p>
                      </div>
                      <div
                        id="studentInfoBoxes"
                        className="three border-1 border-gray-200 rounded-md py-5 flex-col items-center min-w-35 min-h-20 "
                      >
                        <h1 className="font-medium text-xs">Student Average</h1>
                        <p className="font-bold text-xl">{result.average}%</p>
                      </div>
                      <div
                        id="studentInfoBoxes"
                        className="four border-1 border-gray-200 rounded-md py-5 flex-col items-center min-w-35 min-h-20"
                      >
                        <h1 className="font-medium text-xs">Class Position</h1>
                        <p className="font-bold text-xl">
                          {result.class_position} of {result.no_of_students}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-5 mt-8">
                    <div>
                      <PDFDownloadLink
                        className="border-solid border-blue-900 border-2 bg-blue-900 text-gray-100 hover:text-blue-900 hover:bg-gray-100 duration-300 cursor-pointer px-4 py-2 rounded-md font-bold"
                        document={
                          <ResultPdfDocument data={buildPdfData(result)} />
                        }
                        fileName={`${result.student_name}-Result.pdf`}
                      >
                        {({ loading }) =>
                          loading ? "Generating PDF..." : "Result Details"
                        }
                      </PDFDownloadLink>
                    </div>
                    <button
                      onClick={() => setResult(null)}
                      className="border-solid border-blue-900 border-2 hover:bg-blue-900 hover:text-gray-100 text-blue-900 bg-gray-100 duration-300 cursor-pointer rounded-md font-bold checkAnother"
                    >
                      Check Another
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
