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

  //delete o
  // const buildPdfData = (result) => {
  //   // Dynamically collect all subjects
  //   const results = [];
  //   const subjectKeys = Object.keys(result).filter((key) =>
  //     key.startsWith("subject")
  //   );

  //   subjectKeys.forEach((subjectKey) => {
  //     const index = subjectKey.replace("subject", "");
  //     results.push({
  //       subject: result[`subject${index}`],
  //       caScore: result[`ca_score${index}`],
  //       examScore: result[`exam_score${index}`],
  //       totalScore: result[`total_score${index}`],
  //       grade: result[`grade${index}`],
  //       remarks: result[`remarks${index}`],
  //     });
  //   });

  //   return {
  //     schoolInfo: {
  //       name: "Halal Impact Schools",
  //       logoUrl: placeholder,
  //       motto: "Knowledge is Power",
  //       address: "123 School Street, City, Nigeria",
  //       phone: "+234 800 123 4567",
  //       email: "info@halalimpact.edu.ng",
  //       website: "www.halalimpact.edu.ng",
  //     },
  //     reportMeta: {
  //       title: "Student Examination Result Sheet",
  //       term: result.term || "First Term",
  //       session: result.session || "2024/2025",
  //       class: result.class || "JSS 1",
  //       nextTermBegins: "September 15, 2025",
  //       classPosition: result.position || "5th",
  //       no_of_students: result.no_of_students || "20",
  //     },
  //     studentInfo: {
  //       studentId: result.student_id,
  //       studentName: result.student_name,
  //       passportPhotoUrl:
  //         result.passport_url ||
  //         placeHolderImg,
  //     },
  //     principalInfo: {
  //       name: "Mr. John Doe",
  //       signatureLine: "____________________",
  //     },
  //     results: results,
  //     generatedDate: new Date().toLocaleDateString(),
  //   };
  // };

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
        remarks: result[`remarks${index}`],
      });
    });

    return {
      schoolInfo: {
        name: "Halal Impact Schools",
        logoUrl: placeholder,
        motto: "Knowledge is Power",
        address: "123 School Street, City, Nigeria",
        phone: "+234 800 123 4567",
        email: "info@halalimpact.edu.ng",
        website: "www.halalimpact.edu.ng",
      },
      reportMeta: {
        title: "Student Examination Result Sheet",
        term: result.term || "First Term",
        session: result.session || "2024/2025",
        class: result.class || "JSS 1", // 👈 Only class is used
        nextTermBegins: "September 15, 2025",
        classPosition: result.position || "5th",
        no_of_students: result.no_of_students || "20",
      },
      studentInfo: {
        studentId: result.student_id,
        studentName: result.student_name,
        passportPhotoUrl: result.passport_url || placeHolderImg,
      },
      principalInfo: {
        name: "Dorcas Midalla",
        signatureLine: "____________________",
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

  //done deleting

  return (
    <>
      {/* <header className="top-0 fixed flex items-center h-20 gap-1.5">
        <img src={placeholder} alt="logo" className="h-10" />
        <p className="text-lg font-bold">Halal Impact Schools</p>
      </header> */}
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex-col">
          <div className="bg-blue-900 h-20 flex items-center justify-center rounded-b-none rounded gap-4">
            <img src={placeholder} alt="logo" className="h-10" />
            <h1 className="text-3xl font-bold text-white ">
              Student Result Portal
            </h1>
          </div>
          <div className="py-5 rounded-t-none bg-gray-100 rounded border-1 border-gray-200 flex flex-col items-center justify-center p-4">
            {" "}
            {/* bg-gray-100 */}
            {!result && (
              <>
                <PinInputForm onSubmit={handlePinSubmit} />
                {loading && <p className="mt-4">Loading...</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}
              </>
            )}
            {result && (
              <>
                <div className="bg-gray-100 px-6">
                  <h2 className="text-2xl font-bold mb-2 p-0">
                    Result for {result.student_name}
                  </h2>
                  <ul className="mb-4">
                    <li className="mb-2 flex gap-2">
                      <div className="font-extrabold">
                        {result.subject1}
                        {`: `}
                      </div>
                      {result.total_score1}/100 {result.grade1}
                    </li>
                    <li className="mb-2 flex gap-2">
                      <div className="font-extrabold">
                        {result.subject2}
                        {`: `}
                      </div>
                      {result.total_score2}/100 {result.grade2}
                    </li>
                    <li className="mb-2 flex gap-2">
                      <div className="font-extrabold">
                        {result.subject3}
                        {`: `}
                      </div>
                      {result.total_score3}/100 {result.grade3}
                    </li>
                    <li className="mb-2 flex gap-2">
                      <div className="font-extrabold">
                        {result.subject4}
                        {`: `}
                      </div>
                      {result.total_score4}/100 {result.grade4}
                    </li>
                    <li className="mb-2 flex gap-2">
                      <div className="font-extrabold">
                        {result.subject5}
                        {`: `}
                      </div>
                      {result.total_score5}/100 {result.grade5}
                    </li>
                    <li className="mb-2 flex gap-2">
                      <div className="font-extrabold">
                        {result.subject6}
                        {`: `}
                      </div>
                      {result.total_score6}/100 {result.grade6}
                    </li>
                    <li className="mb-2 flex gap-2">
                      <div className="font-extrabold">Average:</div>{" "}
                      {result.total_avg}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-center">
                  <div style={{ padding: "20px" }}>
                    {/* <PDFDownloadLink
                      className="border-solid border-blue-900 border-2 bg-blue-900 text-gray-100 hover:text-blue-900 hover:bg-gray-100 duration-300 cursor-pointer px-4 py-2 rounded font-bold"
                      document={<ResultPdfDocument data={resultData} />}
                      fileName={`${resultData.studentInfo.studentName}-Result.pdf`}
                    >
                      {({ loading }) =>
                        loading ? "Generating PDF..." : "Result Details (PDF)"
                      }
                    </PDFDownloadLink> */}
                    <PDFDownloadLink
                      className="border-solid border-blue-900 border-2 bg-blue-900 text-gray-100 hover:text-blue-900 hover:bg-gray-100 duration-300 cursor-pointer px-4 py-2 rounded font-bold"
                      document={
                        <ResultPdfDocument data={buildPdfData(result)} />
                      }
                      fileName={`${result.student_name}-Result.pdf`}
                    >
                      {({ loading }) =>
                        loading ? "Generating PDF..." : "Result Details (PDF)"
                      }
                    </PDFDownloadLink>
                  </div>
                  <button
                    onClick={() => setResult(null)}
                    className="border-solid border-blue-900 border-2 bg-blue-900 text-gray-100 hover:text-blue-900 hover:bg-gray-100 duration-300 cursor-pointer px-4 py-2 rounded font-bold"
                  >
                    Check Another
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
