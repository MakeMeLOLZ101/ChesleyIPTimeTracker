document.addEventListener('DOMContentLoaded', async () => {
    let currentTimeframe = 'weekly';
    const timeframes = ['Daily', 'Weekly', 'Monthly'];
    let timeframeData = [];

    try {
        const response = await fetch('./data.json');
        if(!response.ok) {
            throw new Error('Could not get JSON data. Try something new.');
        }
        timeframeData = await response.json();
    } catch (error) {
        console.error('Error loading data:', error);
        const dashboard = document.getElementById('dashboard');
        dashboard.innerHTML = '<p style = "color: white; text-align: center;"> Try Again!!!!</p>';
        return;
    }
    
    function createDashboardStructure() {
        const dashboard = document.getElementById('dashboard');
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';
        
        // Profile cards
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.innerHTML = `
            <div class="profile-top">
            <div class="profile-info-container">
                <img src="./images/image-jeremy.png" alt="Profile" class="profile-img">
                <div class="profile-info">
                    <p class="report-text">Report for</p>
                    <h1 class="profile-name">Jeremy Robson</h1>
                </div>
                </div>
            </div>
            <div class="timeframe-buttons">
                ${timeframes.map((timeframe, index) => `
                    <button class="timeframe-btn ${timeframe.toLowerCase() === currentTimeframe ? 'active' : ''}" 
                            data-timeframe="${timeframe.toLowerCase()}">
                        ${timeframe}
                    </button>
                `).join('')}
            </div>
        `;
        
        const activityContainer = document.createElement('div');
        activityContainer.id = 'activity-container';
        
        gridContainer.appendChild(profileCard);
        gridContainer.appendChild(activityContainer);
        dashboard.appendChild(gridContainer);
        
        document.querySelectorAll('.timeframe-btn').forEach(button => {
            button.addEventListener('click', () => {
                const newTimeframe = button.dataset.timeframe;
                document.querySelector('.timeframe-btn.active')?.classList.remove('active');
                button.classList.add('active');
                currentTimeframe = newTimeframe;
                renderDashboard(newTimeframe);
            });
        });
    }

    function getTimeframeText(timeframe) {
        switch (timeframe) {
            case 'daily':
                return 'Yesterday';
            case 'weekly':
                return 'Last Week';
            case 'monthly':
                return 'Last Month';
            default:
                return '';
        }
    }

    function renderDashboard(timeframe) {
        const container = document.getElementById('activity-container');
        container.innerHTML = '';

        timeframeData.forEach(activity => {
            const card = document.createElement('div');
            card.className = `activity-card ${activity.title.toLowerCase().replace(' ', '-')}`;
            
            card.innerHTML = `
                <div class="activity-content">
                    <div class="activity-header">
                        <h2 class="activity-title">${activity.title}</h2>
                        <span class="ellipsis">•••</span>
                    </div>
                    <div class="time-container">
                        <p class="current-time">${activity.timeframes[timeframe].current}hrs</p>
                        <p class="previous-time">${getTimeframeText(timeframe)} - ${activity.timeframes[timeframe].previous}hrs</p>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // Initializer
    createDashboardStructure();
    renderDashboard(currentTimeframe);
});