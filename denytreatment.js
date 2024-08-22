// denytreatment.js

document.getElementById('denyTreatmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        patientName: document.getElementById('patientName').value,
        dob: document.getElementById('dob').value,
        reason: document.getElementById('reason').value,
        authorizedSignature: document.getElementById('authorizedSignature').value,
        date: document.getElementById('date').value,
    };

    const webhookUrl = 'https://discord.com/api/webhooks/1275424306611884074/h6rkyVqqaIfm-Cg-XhCaOGr9Kkr2sx-yhjYFcMZ7yd3wWm0ONpi3-0VjltGe3Nu77NOM';  // Replace with your Discord webhook URL

    const payload = {
        content: null,
        embeds: [
            {
                title: "Deny Medical Treatment Form Submission",
                color: 16711680, // Red color
                fields: [
                    { name: "Patient Name", value: formData.patientName, inline: true },
                    { name: "Date of Birth", value: formData.dob, inline: true },
                    { name: "Reason for Denial", value: formData.reason, inline: false },
                    { name: "Authorized Signature", value: formData.authorizedSignature, inline: true },
                    { name: "Date", value: formData.date, inline: true },
                ],
                footer: {
                    text: "Submitted via Fire Department Website"
                },
                timestamp: new Date(),
            },
        ],
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
            alert('Deny medical treatment form submitted successfully!');
            document.getElementById('denyTreatmentForm').reset();
        } else {
            alert('There was an error submitting the form.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });
});

document.getElementById('denyTreatmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const patientName = document.getElementById('patientName').value;
    const dob = document.getElementById('dob').value;
    const reason = document.getElementById('reason').value;
    const authorizedSignature = document.getElementById('authorizedSignature').value;
    const date = document.getElementById('date').value;

    const treatmentData = {
        patientName: patientName,
        dob: dob,
        reason: reason,
        authorizedSignature: authorizedSignature,
        date: date,
        timestamp: new Date().toLocaleString()
    };

    // Save treatment data to localStorage
    let treatments = JSON.parse(localStorage.getItem('denyTreatments')) || [];
    treatments.push(treatmentData);
    localStorage.setItem('denyTreatments', JSON.stringify(treatments));

    alert('Medical treatment denial form submitted successfully!');
    document.getElementById('denyTreatmentForm').reset();
});

