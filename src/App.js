// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         {/* <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React Nikita N
// //         </a> */}
// //         <text>Name <input></input></text><br></br>
// //         <text>Address <input></input></text><br></br>
// //         <text>Contact <input></input></text><br></br>
// //         <button>Submit</button>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
// import logo from './logo.svg';
// import './App.css';
// import { useState } from 'react';

// function App() {
//   const[form,setForm]=useState({});

//   const handleFrom = (e)=>{
//     console.log(e.target.value,e.target.name);
//     setForm({
//       ...form, // from is variale to send the server
//       [e.target.name] : e.target.value
//     })
//   }
//   const handleSubmit =(e)=>{
//     e.preventDefault();
//     console.log(form);
//   }
//   return (
//     <>
//     <div>
//       <form onSubmit={handleSubmit}>
//         <p>{JSON.stringify(form)}</p>
//         <span>Username</span>
//         <input type="text" name="username" onChange={handleFrom}></input>
//         <span>Passord</span>
//         <input type="text" name="password"onChange={handleFrom}></input>
//         <input type="submit" name="sub" onClick={onButtonClick}></input>
//       </form>
//     </div>
//     </>  
//     );
// }

// export default App;

/************************************************* */
// import React from "react";
// const App = () => {
    
//     // Function will execute on click of button
//     const onButtonClick = () => {
//         // using Java Script method to get PDF file
//         fetch("SamplePDF.pdf").then((response) => {
//             response.blob().then((blob) => {            
//                 // Creating new object of PDF file
//                 const fileURL =
//                     window.URL.createObjectURL(blob);                    
//                 // Setting various property values
//                 let alink = document.createElement("a");
//                 alink.href = fileURL;
//                 alink.download = "SamplePDF.pdf";
//                 alink.click();
//             });
//         });
//     };
//     return (
//         <>
//             <center>
//                 <h1>Welcome to Geeks for Geeks</h1>
//                 <h3>
//                     Click on below button to download PDF
//                     file
//                 </h3>
//                 <button onClick={onButtonClick}>
//                     Download PDF
//                 </button>
//             </center>
//         </>
//     );
// };
// export default App;

/************************************************************ */


// import React, { useRef } from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// const App = () => {
//   const contentRef = useRef();

//   const generatePDF = async () => {
//     const content = contentRef.current; // Reference to the HTML content
//     const canvas = await html2canvas(content); // Convert HTML to canvas
//     const imgData = canvas.toDataURL("image/png"); // Convert canvas to image data

//     const pdf = new jsPDF("p", "mm", "a4"); // Initialize jsPDF with A4 size
//     const pageWidth = pdf.internal.pageSize.getWidth(); // Get page width
//     const pageHeight = pdf.internal.pageSize.getHeight(); // Get page height

//     const imgWidth = pageWidth; // Scale image width to fit PDF page
//     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale image height proportionally

//     // Add the image to the PDF (positioned at x=0, y=0)
//     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

//     // Save the PDF with a filename
//     pdf.save("download.pdf");
//   };

//   return (
//     <div>
//       <div ref={contentRef} style={{ padding: 20, backgroundColor: "#f5f5f5" }}>
//         <h1>Hello, React to PDF!</h1>
//         <p>
//           This is a demo content that will be converted to a PDF file.
//           Everything inside this container will be captured as an image and
//           added to the PDF.
//         </p>
//         <ul>
//           <li>List Item 1</li>
//           <li>List Item 2</li>
//           <li>List Item 3</li>
//         </ul>
//       </div>

//       <button
//         onClick={generatePDF}
//         style={{
//           marginTop: 20,
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: 5,
//           cursor: "pointer",
//         }}
//       >
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default App;

/*********************************** */
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const App = () => {
  const proposalRef = useRef();

  // Function to generate PDF
  const generatePDF = async () => {
    const content = proposalRef.current; // Reference to the proposal section
    const canvas = await html2canvas(content, { scale: 2 }); // Convert content to canvas
    const imgData = canvas.toDataURL("image/png"); // Get image data from canvas

    const pdf = new jsPDF("p", "mm", "a4"); // Create a PDF (portrait, A4 size)
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add pages if content overflows
    while (heightLeft > 0) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, Math.min(imgHeight, heightLeft));
      heightLeft -= pageHeight;
      position -= pageHeight;
      if (heightLeft > 0) pdf.addPage();
    }

    pdf.save("Proposal.pdf"); // Save the PDF
  };

  return (
    <div>
      {/* Proposal Content */}
      <div ref={proposalRef} style={{ padding: 20, backgroundColor: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1>Website Development & Digital Marketing Proposal</h1>
          <p>Prepared by: Your Company Name</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Section 1: Introduction */}
        <section style={{ marginBottom: 20 }}>
          <h2>Introduction</h2>
          <p>
            Thank you for considering our services for your website development
            and digital marketing needs. Our goal is to help you establish a
            strong online presence, increase your website traffic, and boost
            your business through proven digital strategies.
          </p>
        </section>

        {/* Section 2: Scope of Work */}
        <section style={{ marginBottom: 20 }}>
          <h2>Scope of Work</h2>
          <ul>
            <li>Custom website design and development</li>
            <li>Responsive and mobile-friendly website</li>
            <li>Search Engine Optimization (SEO)</li>
            <li>Social Media Marketing (Facebook, Instagram, LinkedIn)</li>
            <li>Pay-Per-Click Advertising (Google Ads, Social Media Ads)</li>
            <li>Content creation and blogging</li>
          </ul>
        </section>

        {/* Section 3: Timeline */}
        <section style={{ marginBottom: 20 }}>
          <h2>Timeline</h2>
          <p>
            The project will be completed in 4 phases over a period of 12 weeks:
          </p>
          <ol>
            <li>Phase 1: Research and strategy (2 weeks)</li>
            <li>Phase 2: Design and development (6 weeks)</li>
            <li>Phase 3: Testing and launch (2 weeks)</li>
            <li>Phase 4: Post-launch support and marketing (2 weeks)</li>
          </ol>
        </section>

        {/* Section 4: Pricing */}
        <section style={{ marginBottom: 20 }}>
          <h2>Pricing</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 10 }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Service</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>Website Development</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>$5,000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>SEO</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>$2,000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>Social Media Marketing</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>$1,500</td>
              </tr>
            </tbody>
          </table>
          <p>Total: $8,500</p>
        </section>

        {/* Section 5: Contact */}
        <section>
          <h2>Contact Information</h2>
          <p>
            For further inquiries, please contact us at:
            <br />
            <strong>Email:</strong> support@yourcompany.com
            <br />
            <strong>Phone:</strong> +1 234 567 890
          </p>
        </section>
      </div>

      {/* Download Button */}
      <button
        onClick={generatePDF}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        Download Proposal as PDF
      </button>
    </div>
  );
};

export default App;
