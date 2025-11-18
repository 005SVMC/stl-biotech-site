// Auto-detect CSV columns + build DataTable dynamically
$(document).ready(function () {
  // Load PapaParse
  $.getScript("https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js", function () {
    
    Papa.parse("data.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,

      complete: function (results) {
        const data = results.data;

        // If CSV is empty
        if (!data || data.length === 0) {
          console.error("CSV loaded but contains no rows.");
          return;
        }

        // Auto-detect columns from header row
        const selectedCols = Object.keys(data[0]);

        // Build table HTML
        let html = "<thead><tr>";

        selectedCols.forEach(col => {
          html += `<th>${col}</th>`;
        });
        html += "</tr></thead><tbody>";

        data.forEach(row => {
          html += "<tr>";

          selectedCols.forEach(col => {
            let cell = row[col] || "";

            // URL handling (Website + LinkedIn)
            if (typeof cell === "string" && cell.startsWith("http")) {
              if (col.toLowerCase().includes("linkedin")) {
                cell = `<a href="${cell}" target="_blank">LinkedIn</a>`;
              } else if (col.toLowerCase().includes("website")) {
                cell = `<a href="${cell}" target="_blank">Link</a>`;
              }
            }

            // Description truncation
            if (col.toLowerCase().includes("description")) {
              html += `<td class="description-cell">${cell}</td>`;
            } else {
              html += `<td>${cell}</td>`;
            }
          });

          html += "</tr>";
        });

        html += "</tbody>";

        // Insert table HTML
        $("#biotech-table").html(html);

        // Activate DataTables
        $("#biotech-table").DataTable({
          pageLength: 15,
          order: [[0, "asc"]],
          responsive: true
        });
      }
    });

  });
});

// Click-to-expand description
$(document).on("click", ".description-cell", function () {
  $(this).toggleClass("description-expanded");
});
//test change