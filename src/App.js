import { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [fileName1, setFilename1] = useState();
  const [fileName2, setFilename2] = useState();
  const [payoutdata, setPayoutdata] = useState([]);
  const [finalSalaries, setFinalSalaries] = useState([]);

  const containsTotal = (str) => {
    return str && str.toLowerCase().includes("total");
    // Alternatively, you can use a regular expression:
    // return /total/i.test(str);
  };

  // function fillEmptyBktValues(sheetData) {
  //   let lastNonEmptyBkt = null;
  //   let newData = [];

  //   // Iterate through the sheet data
  //   for (let i = 0; i < sheetData.length; i++) {
  //     const entry = sheetData[i];
  //     // Check if bkt value is not empty
  //     if (entry.bkt !== undefined) {
  //       lastNonEmptyBkt = entry.bkt; // Update last non-empty bkt value
  //       // console.log(entry.bkt, '0 1 2 3')
  //       newData.push(entry); // Push the entry to the new data array
  //     } else {
  //       // Fill empty bkt value with the last non-empty bkt value and push to the new data array
  //       console.log(entry.bkt, "undefind");
  //       newData.push({
  //         ...entry,
  //         bkt: lastNonEmptyBkt !== null ? lastNonEmptyBkt : entry.bkt,
  //       });
  //     }
  //   }
  //   console.log(newData, "new array");

  //   return newData;
  // }
  function getCellValue( sheetName, stab, rb,excelData) {
    console.log(sheetName, stab, rb,excelData)
    const sheetData = excelData;
    // const entries = Object.entries(sheetData);
    // console.log(entries, 'length', entries[0][0])
    console.log(sheetData, 'sheetdata')
    let entryarray = []
    let stabIndex = -1;
    let rbIndex = -1;
    for (let i = 0; i < sheetData.length; i++) {
      // console.log(sheetData[i], 'entered to object')
      const entries = Object.entries(sheetData[i]);
      entryarray.push(entries)
      // console.log(entries)
      // console.log(sheetData[i].stab, 'sheetdata')
    }
    // console.log(entryarray, 'entryarray')
    let columns_heads = []
    for (let i = 0; i < entryarray.length; i++) {
      // columns_heads.push(entryarray[0][i])
      // console.log(entryarray[i][0])
      console.log(entryarray[0][i][0])
    }
    // // Find the stab index
    // for (let i = 0; i < sheetData.length; i++) {
    //   // const entries = Object.entries(obj);
    //     const stabRange = sheetData[i];
    //     console.log(stabRange, 'stab range')
    //     // const entries = Object.entries(stabRange);
    //     // console.log(entries, 'stab range')
    //     const parts = stabRange.split('-');
    //     const lowerBound = parseFloat(parts[0].replace(/[<>=]/g, ''));
    //     const upperBound = parseFloat(parts[1].replace(/[<>=]/g, ''));

    //     if (parts.length === 1 && stab === stabRange) {
    //         stabIndex = i;
    //         break;
    //     } else if (stab.startsWith('<') && parseFloat(stab.substring(1)) < upperBound) {
    //         stabIndex = i;
    //         break;
    //     } else if (stab.startsWith('<=') && parseFloat(stab.substring(2)) <= upperBound) {
    //         stabIndex = i;
    //         break;
    //     } else if (stab.startsWith('>=') && parseFloat(stab.substring(2)) >= lowerBound) {
    //         stabIndex = i;
    //         break;
    //     } else if (stab.startsWith('>') && parseFloat(stab.substring(1)) > lowerBound) {
    //         stabIndex = i;
    //         break;
    //     } else if (parts.length === 2 && parseFloat(stab) >= lowerBound && parseFloat(stab) < upperBound) {
    //         stabIndex = i;
    //         break;
    //     }
    // }

    // // Find the rb index
    // for (let j = 1; j < sheetData[0].length; j++) {
    //     const rbRange = sheetData[0][j];
    //     const rbRanges = rbRange.split('&');
    //     for (const rbRange of rbRanges) {
    //         const bounds = rbRange.split('-');
    //         const lowerBound = parseFloat(bounds[0].replace(/[<>=]/g, ''));
    //         const upperBound = parseFloat(bounds[1].replace(/[<>=]/g, ''));
            
    //         if (bounds.length === 1 && rb === rbRange) {
    //             rbIndex = j;
    //             break;
    //         } else if (rb.startsWith('<') && parseFloat(rb.substring(1)) < upperBound) {
    //             rbIndex = j;
    //             break;
    //         } else if (rb.startsWith('<=') && parseFloat(rb.substring(2)) <= upperBound) {
    //             rbIndex = j;
    //             break;
    //         } else if (rb.startsWith('>=') && parseFloat(rb.substring(2)) >= lowerBound) {
    //             rbIndex = j;
    //             break;
    //         } else if (rb.startsWith('>') && parseFloat(rb.substring(1)) > lowerBound) {
    //             rbIndex = j;
    //             break;
    //         } else if (bounds.length === 2 && parseFloat(rb) >= lowerBound && parseFloat(rb) < upperBound) {
    //             rbIndex = j;
    //             break;
    //         }
    //     }
    //     if (rbIndex !== -1) {
    //         break;
    //     }
    // }

    // // Return the cell value if both stab and rb indices are found
    // if (stabIndex !== -1 && rbIndex !== -1) {
    //   console.log(sheetData[stabIndex][rbIndex])
    //     return sheetData[stabIndex][rbIndex];
    // } else {
    //     return "No matching value found";
    // }
}


  const handleFile1Change = async (e) => {
    try {
      const file = e.target.files[0];
      setFilename1(file.name);
      await processDatasalary(file);
    } catch (error) {
      console.error("Error handling file 1:", error);
    }
  };

  

  const handleFile2Change = async (e) => {
    try {
      const file = e.target.files[0];
      setFilename2(file.name);
      await processPayout(file);
    } catch (error) {
      console.error("Error handling file 2:", error);
    }
  };

  const processDatasalary = async (file) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[3]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const allTl = new Set(jsonData.map((item) => item.TL));
      const finalSalaries = [];
      // console.log(jsonData, 'main jaons file')
      allTl.forEach((titem) => {
        console.log('for', titem)
        const exBkts = [];
        let ex = "";
        
        jsonData.forEach((item) => {
          console.log(item, 'fos under tl')
          if (item.TL === titem) {
            // console.log(item.RBPOS)
            ex = item.FOS;
            if (!containsTotal(item.FOS)) {
              if (!item.FOS) {
                return;
              } // Skip null, undefined, or empty string FOS
              exBkts.push(item.BOM_BKT);
              const bkt = item.BOM_BKT;
              const POS = parseFloat(item.POS);
              const SPOS = parseFloat(item.SPOS);
              const STAB = (POS / SPOS) * 100;
              const RB = (item.RBPOS / POS) * 100;
              const FIX_SAL = parseFloat(item.salary_settl);
              const NO_OF_EMI = parseFloat(item.NO_OF_EMI);
              console.log(typeof(NO_OF_EMI), item.NO_OF_EMI, 'no of emi')
              console.log(typeof(FIX_SAL),item.salary_settl,'salary')
              // console.log(typeof(STAB), STAB, 'stab')
              // console.log(typeof(item.RBPOS),item.RBPOS,'rbpos')
              // console.log(typeof(RB),RB,'rb')
              // console.log(typeof(bkt),bkt,'bkt')
              // // console.log(item.RBPOS,'2')
              const payments = getCellValue(
                bkt,
                STAB,
                RB,
                payoutdata
              );
              const examt = 300; const tlamt = 50
              // console.log(payments)
              const EX_AMT = NO_OF_EMI * examt + FIX_SAL;
              console.log(EX_AMT, NO_OF_EMI , examt, FIX_SAL)
              const TL_AMT = NO_OF_EMI * tlamt;
              if (ex == null) {
                ex = item.FOS;
              }
              finalSalaries.push({
                tl: titem,
                ex: ex,
                bkt: bkt,
                tlamt: TL_AMT,
                examt: EX_AMT,
              });
            }
            ex = "";
          }
        });
      });
      // console.log(finalSalaries);
      setFinalSalaries(finalSalaries)
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  const processPayout = async (file) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[1]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData, 'payout file')
      setPayoutdata(jsonData)
      getCellValue( '0', '87%', '17%',jsonData);
      // Call the function to get cell value
      // const cellValue = getCellValue(jsonData, sheetName, stab, rb);
      // console.log("Cell Value:", cellValue);
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };
  

  return (
    <div className="App">
      <h5>{fileName1 ? `File 1 Name: ${fileName1}` : "Choose Finance Sheet"}</h5>
      <input type="file" onChange={handleFile1Change} />
      <h5>{fileName2 ? `File 2 Name: ${fileName2}` : "Choose Payuot Sheet"}</h5>
      <input type="file" onChange={handleFile2Change} />

     
      <div className="final-salaries">
        <h2>Final Salaries</h2>
        <table>
          <thead>
            <tr>
              <th>TL</th>
              <th>EX</th>
              <th>BKT</th>
              <th>TL Amount</th>
              <th>EX Amount</th>
            </tr>
          </thead>
          <tbody>
            {finalSalaries.map((salary, index) => (
              <tr key={index}>
                <td>{salary.tl}</td>
                <td>{salary.ex}</td>
                <td>{salary.bkt}</td>
                <td>{salary.tlamt}</td>
                <td>{salary.examt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   
  );
}

export default App;
