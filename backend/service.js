const fs = require("fs");
const csvReadableStream = require("csv-reader");
const xml2js = require("xml2js");
const { NO_RECORD_AVAILABLE, END_BALANCE_ISSUE, DUPLICATE_RECORDS } = require("./constant");

//csvDataValidation
const csvDataValidation = (filePath) => {
  let data = [];
  return new Promise((resolve, reject) => {
    let uploaddir = `uploads\\` + filePath;
    let inputStream = fs.createReadStream(uploaddir, { encoding: "latin1" });
    inputStream
      .pipe(
        new csvReadableStream({
          parseNumbers: true,
          parseBooleans: true,
          trim: true,
          skipLines: 1,
        })
      )
      .on("data", async (row) => {
        data.push({
          reference: row[0],
          accountNumber: row[1],
          description: row[2],
          endBalance: row[5],
          mutation: row[4],
          startBalance: row[3],
        });
      })
      .on("end", async () => {
        //check duplicate reference
        let duplicateDataObj = (await checkDuplicate(data)) || [];
        //check end balance
        let endBalanceDataObj = (await validateEndBalance(data)) || [];

        if (data && data.length == 0) {
          reject({ error: NO_RECORD_AVAILABLE });
        } else {
          resolve({
            data: [...duplicateDataObj, ...endBalanceDataObj],
          });
        }
      });
  });
};

//xmlDataValidation
const xmlDataValidation = (filePath) => {
  return new Promise((resolve, reject) => {
    let uploaddir = `uploads\\` + filePath;
    var parser = new xml2js.Parser();
    fs.readFile(uploaddir, (err, data) => {
      parser.parseString(data, async (err, result) => {
        if (result.records?.record && result.records.record.length > 0) {
          const dataArr = result.records.record.map((record) => {
            record.reference = record.$.reference;
            record.accountNumber = record.accountNumber[0];
            record.description = record.description[0];
            record.endBalance = record.endBalance[0];
            record.mutation = record.mutation[0];
            record.startBalance = record.startBalance[0];
            delete record.$;
            return record;
          });

          //check duplicate reference number
          let duplicateDataArr = await checkDuplicate(dataArr) || [];
          //check end balance
          let endBalanceDataArr = await validateEndBalance(dataArr) || [];

          resolve({
            data: [...duplicateDataArr, ...endBalanceDataArr],
          });
        } else {
          reject({ error: NO_RECORD_AVAILABLE });
        }
      });
    });
  });
};

//validate All reference in unique
const checkForDuplicateCount = (transactions) => {
  if (new Set(transactions).size !== transactions.length) {
    return [
      ...new Set(
        transactions.filter((elem, idx, arr) => arr.indexOf(elem) !== idx)
      ),
    ];
  }
};

//validate End Balance
const validateEndBalance = (data) => {
  if (data && data.length > 0) {
    // calculate and verify end balance.
    let endBalanceIssueDataArr = data
      .filter((trans) => {
        let balanceAmt = parseFloat(trans.startBalance) + parseFloat(trans.mutation);
        if (parseFloat(balanceAmt).toFixed(2) != parseFloat(trans.endBalance).toFixed(2)) {
          return trans;
        }
      })
      .map((trans) => {
        trans.message = END_BALANCE_ISSUE;
        return trans;
      });

    return endBalanceIssueDataArr;
   
  }
};

//check duplicate reference number exist
const checkDuplicate = (data) => {
  //extract all reference number
  const allTransactionIdsArr = data.map((transaction) => transaction.reference);

  // check duplicate reference number
  const duplicateIdsArr = checkForDuplicateCount(allTransactionIdsArr);

  // get all duplicate transaction
  if (duplicateIdsArr && duplicateIdsArr.length > 0) {
    let allDuplicateRecArr = data
      .filter((trans) => duplicateIdsArr.includes(trans.reference))
      .map((trans) => {
        trans.message = DUPLICATE_RECORDS;
        return trans;
      });
    return allDuplicateRecArr != undefined ? allDuplicateRecArr : [];
  }
};

module.exports = { csvDataValidation, xmlDataValidation };
