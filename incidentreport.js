// incidentreport.js

document.getElementById('incidentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const webhookURL = 'https://discord.com/api/webhooks/1275196732631945216/o86OMgZ88K6h_MTppJQrxPfSUxyFu8aYbKZOJUTEZ4NpoVq8FW5jRUZOjrhEB43qDZBV'; // Replace with your Discord webhook URL

    const yourName = document.getElementById('yourName').value;
    const callsign = document.getElementById('callsign').value;
    const incidentType = document.getElementById('incidentType').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    const data = {
        content: null,
        embeds: [
            {
                title: "New Incident Report",
                color: 16711680,
                fields: [
                    {
                        name: "Your Name",
                        value: yourName,
                        inline: true
                    },
                    {
                        name: "Callsign",
                        value: callsign,
                        inline: true
                    },
                    {
                        name: "Incident Type",
                        value: incidentType,
                        inline: true
                    },
                    {
                        name: "Location",
                        value: location,
                        inline: true
                    },
                    {
                        name: "Description",
                        value: description,
                        inline: false
                    }
                ],
                footer: {
                    text: "Fire Department Incident Report"
                },
                timestamp: new Date()
            }
        ]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Incident report submitted successfully!');
            document.getElementById('incidentForm').reset();
        } else {
            alert('Error submitting report.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting report.');
    });
});

document.getElementById('incidentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const yourName = document.getElementById('yourName').value;
    const callsign = document.getElementById('callsign').value;
    const incidentType = document.getElementById('incidentType').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    const reportData = {
        yourName: yourName,
        callsign: callsign,
        incidentType: incidentType,
        location: location,
        description: description,
        timestamp: new Date().toLocaleString()
    };

    // Save report data to localStorage (persistent storage across pages)
    let reports = JSON.parse(localStorage.getItem('incidentReports')) || [];
    reports.push(reportData);
    localStorage.setItem('incidentReports', JSON.stringify(reports));

    alert('Incident report submitted successfully!');
    document.getElementById('incidentForm').reset();
});



