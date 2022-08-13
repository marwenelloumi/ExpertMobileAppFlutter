const axios = require('axios');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZlZGU2YTBiYTYyNTcwYWZjZWFhYmEiLCJlbWFpbCI6InRlc3QudXNlckB1bmZyYXVkZWQuY29tIiwiaWRlbnRpZmllciI6InRlc3QudXNlckB1bmZyYXVkZWQuY29tIiwiaWF0IjoxNjU4MDM4ODY1LCJleHAiOjE2NTg2NDM2NjV9.CrQJFQ3P6ElFrC3RRbBH20zm9uMV-bg8pL9AGS8FPdo'
async function updateInsurances() {
    axios.get('http://52.21.181.211:4200/mobileApp/insurances', {
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(function(insurance) {
            var insuranceName = insurance.name;

            return insurance.id
        });
      })
      .catch((error) => {
        return error
      })
}
module.exports = updateInsurances;
