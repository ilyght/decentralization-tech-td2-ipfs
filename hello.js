const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5NWZjOWQ1NC0xZGU3LTRkMjQtOTg5NC1mNmIyNjBmMjNjZjUiLCJlbWFpbCI6Imx1Y2lsZS5kcmVzbGVyQGVkdS5kZXZpbmNpLmZyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImZiYzYzNWI5ZjdlN2RhZDI4NDc4Iiwic2NvcGVkS2V5U2VjcmV0IjoiYTRjM2QzZDcwYmEzNTk1MTgwYTViZTMwMjU4ZDE3NGFjMzdhYmI4N2NkMDYzMjY0NWMzZGQyMzZmODlmYzI5NyIsImlhdCI6MTcwNzQyNDUwMX0.7f_PMnsTAWTLopQx0-zx7PksABHWL7Y6Hen-ULoIFxI"

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "test td2 decentralization.txt";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}
pinFileToIPFS()
