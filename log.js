document.addEventListener('DOMContentLoaded', function () {
    const incidentLogsContainer = document.getElementById('incidentLogs');
    const denyTreatmentLogsContainer = document.getElementById('denyTreatmentLogs');

    // Fetch and display incident reports
    let reports = JSON.parse(localStorage.getItem('incidentReports')) || [];
    if (reports.length === 0) {
        incidentLogsContainer.innerHTML += '<p>No incident reports found.</p>';
    } else {
        reports.forEach((report, index) => {
            const reportDiv = document.createElement('div');
            reportDiv.classList.add('incident-report');
            reportDiv.innerHTML = `
                <h4>Incident #${index + 1}</h4>
                <p><strong>Name:</strong> ${report.yourName}</p>
                <p><strong>Callsign:</strong> ${report.callsign}</p>
                <p><strong>Incident Type:</strong> ${report.incidentType}</p>
                <p><strong>Location:</strong> ${report.location}</p>
                <p><strong>Description:</strong> ${report.description}</p>
                <p><strong>Date/Time:</strong> ${report.timestamp}</p>
                <button onclick="deleteReport(${index})">Delete Report</button>
                <hr>
            `;
            incidentLogsContainer.appendChild(reportDiv);
        });
    }

    // Fetch and display deny treatment records
    let treatments = JSON.parse(localStorage.getItem('denyTreatments')) || [];
    if (treatments.length === 0) {
        denyTreatmentLogsContainer.innerHTML += '<p>No medical treatment denial records found.</p>';
    } else {
        treatments.forEach((treatment, index) => {
            const treatmentDiv = document.createElement('div');
            treatmentDiv.classList.add('deny-treatment-record');
            treatmentDiv.innerHTML = `
                <h4>Deny Medical Treatment #${index + 1}</h4>
                <p><strong>Patient Name:</strong> ${treatment.patientName}</p>
                <p><strong>Date of Birth:</strong> ${treatment.dob}</p>
                <p><strong>Reason for Denial:</strong> ${treatment.reason}</p>
                <p><strong>Authorized Signature:</strong> ${treatment.authorizedSignature}</p>
                <p><strong>Date:</strong> ${treatment.date}</p>
                <p><strong>Date/Time:</strong> ${treatment.timestamp}</p>
                <p><strong>Status:</strong> ${treatment.status || 'Pending'}</p>
                <button onclick="updateStatus(${index}, 'denyTreatments', 'approved')">Approve</button>
                <button onclick="updateStatus(${index}, 'denyTreatments', 'denied')">Deny</button>
                <button onclick="deleteTreatment(${index})">Delete Record</button>
                <hr>
            `;
            denyTreatmentLogsContainer.appendChild(treatmentDiv);
        });
    }
});

// Function to delete a report
function deleteReport(index) {
    let reports = JSON.parse(localStorage.getItem('incidentReports')) || [];
    if (index >= 0 && index < reports.length) {
        reports.splice(index, 1); // Remove the selected report
        localStorage.setItem('incidentReports', JSON.stringify(reports)); // Update localStorage
        location.reload(); // Reload the page to reflect changes
    }
}

// Function to delete a treatment record
function deleteTreatment(index) {
    let treatments = JSON.parse(localStorage.getItem('denyTreatments')) || [];
    if (index >= 0 && index < treatments.length) {
        treatments.splice(index, 1); // Remove the selected treatment record
        localStorage.setItem('denyTreatments', JSON.stringify(treatments)); // Update localStorage
        location.reload(); // Reload the page to reflect changes
    }
}

// Function to update the status of a report or record
function updateStatus(index, type, status) {
    let items = JSON.parse(localStorage.getItem(type)) || [];
    if (index >= 0 && index < items.length) {
        items[index].status = status;
        localStorage.setItem(type, JSON.stringify(items));
        location.reload(); // Reload the page to reflect changes
    }
}

