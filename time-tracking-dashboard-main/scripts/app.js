document.addEventListener('DOMContentLoaded', () => {
    let timeframeData = [];
    let currentTimeframe = 'weekly';
    const timeframes = ['Daily', 'Weekly', 'Monthly'];
    
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
                document.querySelector('.timeframe-btn.active')?.classList.remove('active');
                button.classList.add('active');
                currentTimeframe = button.dataset.timeframe;
                renderDashboard(currentTimeframe);
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

    const data = [
        {
            "title": "Work",
            "timeframes": {
                "daily": { "current": 5, "previous": 7 },
                "weekly": { "current": 32, "previous": 36 },
                "monthly": { "current": 103, "previous": 128 }
            }
        },
        {
            "title": "Play",
            "timeframes": {
                "daily": { "current": 1, "previous": 2 },
                "weekly": { "current": 10, "previous": 8 },
                "monthly": { "current": 23, "previous": 29 }
            }
        },
        {
            "title": "Study",
            "timeframes": {
                "daily": { "current": 0, "previous": 1 },
                "weekly": { "current": 4, "previous": 7 },
                "monthly": { "current": 13, "previous": 19 }
            }
        },
        {
            "title": "Exercise",
            "timeframes": {
                "daily": { "current": 1, "previous": 1 },
                "weekly": { "current": 4, "previous": 5 },
                "monthly": { "current": 11, "previous": 18 }
            }
        },
        {
            "title": "Social",
            "timeframes": {
                "daily": { "current": 1, "previous": 3 },
                "weekly": { "current": 5, "previous": 10 },
                "monthly": { "current": 21, "previous": 23 }
            }
        },
        {
            "title": "Self Care",
            "timeframes": {
                "daily": { "current": 0, "previous": 1 },
                "weekly": { "current": 2, "previous": 2 },
                "monthly": { "current": 7, "previous": 11 }
            }
        }
    ];
    
    timeframeData = data;
    renderDashboard(currentTimeframe);
});