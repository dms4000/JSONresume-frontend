async function fetchAndDisplayData() {
    try {
        // Fetch data from the Azure Function
        const response = await fetch('https://fadmscvapi-pers.azurewebsites.net/api/cv_data');  // Replace with your Function URL
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Log the data to inspect its structure
        console.log('Fetched data:', data);

        // Reference to the container
        const container = document.getElementById('profile-container');

        // Validate the data structure
        if (data && Array.isArray(data) && data.length > 0 && data[0].basics) {
            const profile = data[0];

            container.innerHTML = `
                <div class="profile-header">
                    <h1>${profile.basics.name}</h1>
                    <p>${profile.basics.label}</p>
                    <p>Email: <a href="mailto:${profile.basics.email}">${profile.basics.email}</a></p>
                    <p>Phone: ${profile.basics.phone}</p>
                    <p>Website: <a href="${profile.basics.url}" target="_blank">${profile.basics.url}</a></p>
                    <p>${profile.basics.summary}</p>
                </div>
                <div class="profile-section">
                    <h2>Work Experience</h2>
                    <ul>
                        ${profile.work.map(job => `
                            <li>
                                <strong>${job.position}</strong> at <a href="${job.url}" target="_blank">${job.name}</a>
                                <p>${job.startDate} - ${job.endDate}</p>
                                <p>${job.summary}</p>
                                <ul>${job.highlights.map(highlight => `<li>${highlight}</li>`).join('')}</ul>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="profile-section">
                    <h2>Education</h2>
                    <ul>
                        ${profile.education.map(edu => `
                            <li>
                                <strong>${edu.studyType} in ${edu.area}</strong> from <a href="${edu.url}" target="_blank">${edu.institution}</a>
                                <p>${edu.startDate} - ${edu.endDate}</p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="profile-section">
                    <h2>Awards</h2>
                    <ul>
                        ${profile.awards.map(award => `
                            <li>
                                <strong>${award.title}</strong> by ${award.awarder}
                                <p>${award.date}</p>
                                <p>${award.summary}</p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="profile-section">
                    <h2>Certificates</h2>
                    <ul>
                        ${profile.certificates.map(cert => `
                            <li>
                                <strong>${cert.name}</strong> by ${cert.issuer}
                                <p>${cert.date}</p>
                                <p><a href="${cert.url}" target="_blank">${cert.url}</a></p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="profile-section">
                    <h2>Publications</h2>
                    <ul>
                        ${profile.publications.map(pub => `
                            <li>
                                <strong>${pub.name}</strong> by ${pub.publisher}
                                <p>${pub.releaseDate}</p>
                                <p>${pub.summary}</p>
                                <p><a href="${pub.url}" target="_blank">${pub.url}</a></p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="profile-section">
                    <h2>Skills</h2>
                    <ul>
                        ${profile.skills.map(skill => `
                            <li>
                                <strong>${skill.name}</strong> - ${skill.level}
                                <ul>${skill.keywords.map(keyword => `<li>${keyword}</li>`).join('')}</ul>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="profile-section">
                    <h2>Languages</h2>
                    <ul>
                        ${profile.languages.map(lang => `
                            <li>
                                <strong>${lang.language}</strong> - ${lang.fluency}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="profile-section">
                    <h2>Interests</h2>
                    <ul>
                        ${profile.interests.map(interest => `
                            <li>
                                <strong>${interest.name}</strong>
                                <ul>${interest.keywords.map(keyword => `<li>${keyword}</li>`).join('')}</ul>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="profile-section">
                    <h2>References</h2>
                    <ul>
                        ${profile.references.map(ref => `
                            <li>
                                <strong>${ref.name}</strong>
                                <p>${ref.reference}</p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="profile-section">
                    <h2>Projects</h2>
                    <ul>
                        ${profile.projects.map(proj => `
                            <li>
                                <strong>${proj.name}</strong>
                                <p>${proj.startDate} - ${proj.endDate}</p>
                                <p>${proj.description}</p>
                                <ul>${proj.highlights.map(highlight => `<li>${highlight}</li>`).join('')}</ul>
                                <p><a href="${proj.url}" target="_blank">${proj.url}</a></p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        } else {
            container.innerHTML = '<p>Data is not available or improperly formatted.</p>';
        }
    } catch (error) {
        console.error('Error fetching or displaying data:', error);
        document.getElementById('profile-container').innerHTML = '<p>Error fetching data.</p>';
    }
}

fetchAndDisplayData();
