// ResultPdfDocument.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottom: "1 solid black",
    paddingBottom: 5,
  },
  logo: {
    width: 60,
    height: 60,
  },
  schoolInfo: {
    textAlign: "center",
  },
  motto: {
    fontStyle: "italic",
    fontSize: 10,
  },
  sectionTitle: {
    marginTop: 10,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  studentInfo: {
    marginTop: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#eee",
    flex: 1,
    padding: 3,
    fontWeight: "bold",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flex: 1,
    padding: 3,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
});

const ResultPdfDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image src={data.schoolInfo.logoUrl} style={styles.logo} />
        <View style={styles.schoolInfo}>
          <Text>{data.schoolInfo.name}</Text>
          <Text style={styles.motto}>{data.schoolInfo.motto}</Text>
          <Text>{data.reportMeta.title}</Text>
        </View>
      </View>

      {/* SCHOOL CONTACT INFO */}
      <View>
        <Text>{data.schoolInfo.address}</Text>
        <Text>Phone: {data.schoolInfo.phone}</Text>
        <Text>Email: {data.schoolInfo.email}</Text>
        <Text>Website: {data.schoolInfo.website}</Text>
      </View>

      {/* STUDENT INFO */}
      <Text style={styles.sectionTitle}>Student Information</Text>
      <View style={styles.studentInfo}>
        <Text>Name: {data.studentInfo.studentName}</Text>
        <Text>Student ID: {data.studentInfo.studentId}</Text>
        <Text>Class: {data.reportMeta.class}</Text>
        <Text>Term: {data.reportMeta.term}</Text>
        <Text>Session: {data.reportMeta.session}</Text>
        <Text>
          Class Position: {data.reportMeta.classPosition} of{" "}
          {data.reportMeta.no_of_students} students
        </Text>
        <Text>Next Term Begins: {data.reportMeta.next_term_begins}</Text>
      </View>

      {/* RESULTS TABLE */}
      <Text style={styles.sectionTitle}>Results</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Subject</Text>
          <Text style={styles.tableColHeader}>CA</Text>
          <Text style={styles.tableColHeader}>Exam</Text>
          <Text style={styles.tableColHeader}>Total</Text>
          <Text style={styles.tableColHeader}>Grade</Text>
          <Text style={styles.tableColHeader}>Remarks</Text>
        </View>
        {data.results.map((item, idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.tableCol}>{item.subject}</Text>
            <Text style={styles.tableCol}>{item.caScore}</Text>
            <Text style={styles.tableCol}>{item.examScore}</Text>
            <Text style={styles.tableCol}>{item.totalScore}</Text>
            <Text style={styles.tableCol}>{item.grade}</Text>
            <Text style={styles.tableCol}>{item.remarks}</Text>
          </View>
        ))}
      </View>

      {/* PRINCIPAL / SIGNATURE */}
      <Text style={styles.sectionTitle}>Principal's Signature</Text>
      <View>
        <Text>{data.principalInfo.signatureLine}</Text>
        <Text>{data.principalInfo.name}</Text>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text>Generated on {data.generatedDate}</Text>
      </View>
    </Page>
  </Document>
);

export default ResultPdfDocument;
