document.addEventListener('DOMContentLoaded', () => {
  fetch('papers/publications.json')
    .then(response => response.json())
    .then(papers => {
      const grouped = {};
      papers.forEach(paper => {
        if (!grouped[paper.year]) {
          grouped[paper.year] = [];
        }
        grouped[paper.year].push(paper);
      });

      const container = document.getElementById('paper-list');
      const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));

      sortedYears.forEach(year => {
        const yearHeader = document.createElement('h3');
        yearHeader.textContent = year;
        container.appendChild(yearHeader);

        const ul = document.createElement('ul');
        grouped[year].forEach(paper => {
          const item = document.createElement('li');

          // 高亮所有包含 "Qing Wang" 的作者名（大小写敏感匹配子串）
          const highlightedAuthors = paper.authors.map(name =>
            name.includes("Qing Wang") ? `<span class="highlight">${name}</span>` : name
          ).join(", ");

          const codeLink = paper.code ? ` | <a href="${paper.code}" target="_blank">[Code]</a>` : "";

          item.innerHTML = `
            <a href="${paper.link}" target="_blank">${paper.title}</a>${codeLink}<br>
            <span>${highlightedAuthors}</span><br>
            <span>${paper.venue}${paper.short ? ` (<span class="venue-short">${paper.short}</span>)` : ""}, ${paper.year}</span>
            ${paper.award ? `<br><span class="award"> ${paper.award}</span>` : ""}
          `;
          ul.appendChild(item);
        });
        container.appendChild(ul);
      });
    })
    .catch(error => {
      console.error('Failed to load publications:', error);
      const container = document.getElementById('paper-list');
      container.innerHTML = '<p>Failed to load publication list.</p>';
    });
});
