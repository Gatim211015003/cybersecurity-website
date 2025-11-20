// Function to set the active navigation link
function setActiveLink() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    
    // Add active class if the link's href matches the current page
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

async function loadData() {
  try {
    const page = window.location.pathname.split("/").pop();
    if (page === 'index.html' || page === '') {
      return; // No data to load on the index page
    }

    const res = await fetch("data.json"); 
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    const contentDiv = document.getElementById("content");

    if (!contentDiv) return;

    if (page === "malware.html") {
        const malware = data.malware;
        contentDiv.innerHTML = `
            <h2>Types of Malware</h2>
            <ul>${malware.types.map(t => `<li>${t}</li>`).join("")}</ul>
            <h2>How It's Used</h2>
            <p>${malware.applications}</p>
            <h2>Advantages for Attackers</h2>
            <p>${malware.advantages}</p>
            <h2>Disadvantages for Victims</h2>
            <p>${malware.disadvantages}</p>
        `;
    } else if (page === "phishing.html") {
        const phishing = data.phishing;
        contentDiv.innerHTML = `
            <h2>Types of Phishing</h2>
            <ul>${phishing.types.map(t => `<li>${t}</li>`).join("")}</ul>
            <h2>How It's Used</h2>
            <p>${phishing.applications}</p>
            <h2>Potential Impacts</h2>
            <p>${phishing.impacts}</p>
        `;
    } else if (page === "comparison.html") {
        const comparison = data.comparison;
        contentDiv.innerHTML = `
            <h2>Malware vs. Phishing</h2>
            <table>
                <thead>
                    <tr>
                        <th>Aspect</th>
                        <th>Malware</th>
                        <th>Phishing</th>
                    </tr>
                </thead>
                <tbody>
                    ${comparison.map(row => `
                        <tr>
                            <td>${row.aspect}</td>
                            <td>${row.malware}</td>
                            <td>${row.phishing}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    } else if (page === "prevention.html") {
        const prevention = data.prevention;
        contentDiv.innerHTML = `
            <h2>How to Protect Yourself</h2>
            <ul>${prevention.map(p => `<li>${p}</li>`).join("")}</ul>
        `;
    }

  } catch (error) {
    console.error("Error loading data:", error);
    const contentDiv = document.getElementById("content");
    if(contentDiv) {
        contentDiv.innerHTML = "<p>Sorry, we couldn't load the content. Please try again later.</p>";
    }
  }
}

// Run functions when the page content is loaded
document.addEventListener("DOMContentLoaded", () => {
    setActiveLink();
    loadData();
});