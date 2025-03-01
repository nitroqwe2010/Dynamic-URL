async function fetchNationality() {
    const name = document.getElementById('nameInput').value.trim();
    if (name === "") {
        alert("Please enter a name!");
        return;
    }

    try {
        const response = await fetch(`https://api.nationalize.io/?name=${name}`);
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = "";

        if (data.country.length === 0) {
            resultDiv.innerHTML = `<p>No nationality found for this name.</p>`;
            return;
        }

        let nationalityList = "<h3>Possible Nationalities:</h3><ul class='nationality-list'>";

        data.country.slice(0, 5).forEach((country, index) => {
            const countryCode = country.country_id.toUpperCase(); // ✅ FlagCDN-da kodlar KATTA harf bilan bo‘lishi kerak
            const probability = (country.probability * 100).toFixed(1);
            const flagUrl = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`; // ✅ To‘g‘ri URL

            nationalityList += `
                <li>
                    <span>${index + 1}.</span>
                    <img class="flag" src="${flagUrl}" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_available.svg/40px-No_image_available.svg.png';" alt="Flag">
                    <strong>${country.country_id}</strong> ${probability}%
                </li>
            `;
        });

        nationalityList += "</ul>";
        resultDiv.innerHTML = nationalityList;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('result').innerHTML = "<p>An error occurred. Please try again.</p>";
    }
}
