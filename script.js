// This version uses PapaParse for reliable CSV reading
$(document).ready(function() {
  // Load PapaParse library dynamically
  $.getScript("https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js", function() {
    
    Papa.parse("data.csv", {
      download: true,
      header: true,   // Use the header row
      skipEmptyLines: true,
      complete: function(results) {
        const data = results.data;

        // Columns to display
        const selectedCols = [
          "Company Name", "Industry", "Size", "Status", 
          "Shared Space Name", "Location", "Website", 
          "Funding", "Company staff count range (linkedin)", 
          "followers", "last funding announced on", 
          "last funding money raised"
        ];

        // Create table header
        let html = "<thead><tr>";
        selectedCols.forEach(col => html += `<th>${col}</th>`);
        html += "</tr></thead><tbody>";

        // Create rows
        data.forEach(row => {
          html += "<tr>";
          selectedCols.forEach(col => {
            let cell = row[col] || "";
            if (col === "Website" && cell.startsWith("http"))
              cell = `<a href="${cell}" target="_blank">Link</a>`;
            html += `<td>${cell}</td>`;
          });
          html += "</tr>";
        });

        html += "</tbody>";
        $("#biotech-table").html(html);

        // Activate DataTable
        $("#biotech-table").DataTable({
          pageLength: 15,
          order: [[0, "asc"]],
          responsive: true
        });
      }
    });
  });
});
