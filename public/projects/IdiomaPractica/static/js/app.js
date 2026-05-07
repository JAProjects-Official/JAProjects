// Game state
let gameState = {
    currentQuestion: 0,
    correctAnswers: 0,
    totalAttempts: 0,
    totalCorrect: 0,
    roundWords: [],
    recentWords: [],
    currentWord: null,
    currentOptions: [],
    correctAnswer: null,
    answered: false
};

// DOM elements
const frenchWordEl = document.getElementById('frenchWord');
const optionsContainer = document.getElementById('optionsContainer');
const alertContainer = document.getElementById('alertContainer');
const nextButton = document.getElementById('nextButton');
const progressBar = document.getElementById('progressBar');
const currentQuestionEl = document.getElementById('currentQuestion');
const currentCorrectEl = document.getElementById('currentCorrect');
const totalAttemptsEl = document.getElementById('totalAttempts');
const totalCorrectEl = document.getElementById('totalCorrect');
const accuracyEl = document.getElementById('accuracy');
const recentWordsEl = document.getElementById('recentWords');
const summaryModal = document.getElementById('summaryModal');
const newRoundButton = document.getElementById('newRoundButton');
const closeModalButton = document.getElementById('closeModalButton');
const closeModalButton2 = document.getElementById('closeModalButton2');

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    loadStatsFromStorage();
    startNewRound();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Next button
    nextButton.addEventListener('click', nextQuestion);
    
    // New round button
    newRoundButton.addEventListener('click', function() {
        hideCustomModal();
        startNewRound();
    });
    
    // Close modal buttons
    closeModalButton.addEventListener('click', function() {
        hideCustomModal();
    });
    
    closeModalButton2.addEventListener('click', function() {
        hideCustomModal();
    });
    
    // Click outside modal to close
    summaryModal.addEventListener('click', function(e) {
        if (e.target === summaryModal) {
            hideCustomModal();
        }
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (gameState.answered) return;
        
        const key = parseInt(e.key);
        if (key >= 1 && key <= Math.min(gameState.currentOptions.length, 6)) {
            selectOption(key - 1);
        }
    });
}

// Start new round
function startNewRound() {
    // Reset current round
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.roundWords = [];
    
    // Reset total statistics
    gameState.totalAttempts = 0;
    gameState.totalCorrect = 0;
    gameState.recentWords = [];
    
    // Update displays and save
    updateStats();
    updateRecentWordsDisplay();
    saveStatsToStorage();
    
    nextQuestion();
}

// Load next question
function nextQuestion() {
    if (gameState.currentQuestion >= 10) {
        showRoundSummary();
        return;
    }
    
    gameState.currentQuestion++;
    gameState.answered = false;
    
    // Reset UI
    alertContainer.style.display = 'none';
    nextButton.style.display = 'none';
    frenchWordEl.textContent = 'Cargando...';
    optionsContainer.innerHTML = '';
    
    // Get random French word from vocabulary
    const frenchWords = Object.keys(VOCABULARY);
    const randomIndex = Math.floor(Math.random() * frenchWords.length);
    const frenchWord = frenchWords[randomIndex];
    
    // Get options and shuffle them
    const options = [...VOCABULARY[frenchWord]];
    shuffleArray(options);
    
    // Set game state
    gameState.currentWord = frenchWord;
    gameState.currentOptions = options;
    gameState.correctAnswer = CORRECT_ANSWERS[frenchWord];
    
    displayQuestion();
    updateStats();
}

// Utility function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Display current question
function displayQuestion() {
    frenchWordEl.textContent = gameState.currentWord;
    
    // Create option buttons
    optionsContainer.innerHTML = '';
    gameState.currentOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `
            <span class="keyboard-hint">${index + 1}</span>
            ${option}
        `;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    
    // Update progress
    const progress = (gameState.currentQuestion / 10) * 100;
    progressBar.style.width = progress + '%';
}

// Select an option
function selectOption(index) {
    if (gameState.answered) return;
    
    gameState.answered = true;
    gameState.totalAttempts++;
    
    const selectedOption = gameState.currentOptions[index];
    const isCorrect = selectedOption === gameState.correctAnswer;
    
    // Update buttons
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        btn.classList.add('disabled');
        if (i === index) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (gameState.currentOptions[i] === gameState.correctAnswer) {
            btn.classList.add('correct');
        }
    });
    
    // Update stats
    if (isCorrect) {
        gameState.correctAnswers++;
        gameState.totalCorrect++;
        showAlert('✅ La respuesta es correcta!', 'success');
    } else {
        showAlert(`❌ Incorrecto. La respuesta correcta era: ${gameState.correctAnswer}`, 'danger');
    }
    
    // Add to recent words and round words
    addToRecentWords(gameState.currentWord, selectedOption, isCorrect);
    addToRoundWords(gameState.currentWord, gameState.correctAnswer, isCorrect);
    
    // Show next button
    nextButton.style.display = 'inline-block';
    
    // Update stats display
    updateStats();
    saveStatsToStorage();
}

// Show alert message
function showAlert(message, type) {
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
        </div>
    `;
    alertContainer.style.display = 'block';
}

// Update statistics display
function updateStats() {
    currentQuestionEl.textContent = `${gameState.currentQuestion} de 10`;
    currentCorrectEl.textContent = gameState.correctAnswers;
    totalAttemptsEl.textContent = gameState.totalAttempts;
    totalCorrectEl.textContent = gameState.totalCorrect;
    
    const accuracy = gameState.totalAttempts > 0 
        ? Math.round((gameState.totalCorrect / gameState.totalAttempts) * 100)
        : 0;
    accuracyEl.textContent = accuracy + '%';
}

// Add word to recent words list
function addToRecentWords(frenchWord, selectedAnswer, isCorrect) {
    const wordItem = {
        french: frenchWord,
        selected: selectedAnswer,
        correct: gameState.correctAnswer,
        isCorrect: isCorrect,
        timestamp: Date.now()
    };
    
    gameState.recentWords.unshift(wordItem);
    
    // Keep only last 10 words
    if (gameState.recentWords.length > 10) {
        gameState.recentWords = gameState.recentWords.slice(0, 10);
    }
    
    updateRecentWordsDisplay();
}

// Add word to current round words
function addToRoundWords(frenchWord, correctAnswer, isCorrect) {
    const roundWordItem = {
        french: frenchWord,
        correct: correctAnswer,
        isCorrect: isCorrect
    };
    
    gameState.roundWords.push(roundWordItem);
}

// Update recent words display
function updateRecentWordsDisplay() {
    if (gameState.recentWords.length === 0) {
        recentWordsEl.innerHTML = '<p class="text-muted text-center">Aún no hay palabras practicadas</p>';
        return;
    }
    
    recentWordsEl.innerHTML = gameState.recentWords.map(word => `
        <div class="recent-word-item ${word.isCorrect ? 'correct' : 'incorrect'}">
            <div class="d-flex justify-content-between">
                <strong>${word.french}</strong>
                <span>${word.isCorrect ? '✅' : '❌'}</span>
            </div>
            <small>${word.selected}</small>
        </div>
    `).join('');
}

// Show round summary
function showRoundSummary() {
    const accuracy = Math.round((gameState.correctAnswers / 10) * 100);
    const summaryContent = document.getElementById('summaryContent');
    
    // Pre-build word chips for better performance
    const wordChipsHTML = gameState.roundWords.map(word => {
        const chipClass = word.isCorrect ? 'word-chip-correct' : 'word-chip-incorrect';
        const icon = word.isCorrect ? '✅' : '❌';
        return `<div class="word-chip ${chipClass}"><strong>${word.french}</strong> → ${word.correct}<span class="word-chip-icon">${icon}</span></div>`;
    }).join('');
    
    // Build content efficiently
    summaryContent.innerHTML = `
        <div class="text-center mb-4">
            <h3 class="text-primary">¡Ronda Completada!</h3>
            <div class="row mt-4">
                <div class="col-md-4">
                    <div class="stat-card">
                        <h4 class="text-success">${gameState.correctAnswers}</h4>
                        <p class="text-muted">Correctas</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-card">
                        <h4 class="text-danger">${10 - gameState.correctAnswers}</h4>
                        <p class="text-muted">Incorrectas</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-card">
                        <h4 class="text-primary">${accuracy}%</h4>
                        <p class="text-muted">Precisión</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-4">
            <h5>Palabras de esta ronda:</h5>
            <div class="d-flex flex-wrap gap-2">
                ${wordChipsHTML}
            </div>
        </div>
    `;
    
    // Show custom modal immediately
    showCustomModal();
}

// Save stats to localStorage
function saveStatsToStorage() {
    const stats = {
        totalAttempts: gameState.totalAttempts,
        totalCorrect: gameState.totalCorrect,
        recentWords: gameState.recentWords
    };
    localStorage.setItem('vocabularyStats', JSON.stringify(stats));
}

// Load stats from localStorage
function loadStatsFromStorage() {
    const saved = localStorage.getItem('vocabularyStats');
    if (saved) {
        const stats = JSON.parse(saved);
        gameState.totalAttempts = stats.totalAttempts || 0;
        gameState.totalCorrect = stats.totalCorrect || 0;
        gameState.recentWords = stats.recentWords || [];
        updateStats();
        updateRecentWordsDisplay();
    }
}

// Custom modal functions
function showCustomModal() {
    summaryModal.style.display = 'flex';
    
    // Add escape key support
    document.addEventListener('keydown', escapeHandler);
}

function hideCustomModal() {
    summaryModal.style.display = 'none';
    
    // Remove escape key listener
    document.removeEventListener('keydown', escapeHandler);
}

function escapeHandler(e) {
    if (e.key === 'Escape') {
        hideCustomModal();
    }
}

// Keyboard support for modal
document.addEventListener('keydown', function(e) {
    // Don't interfere with game controls if modal is not open
    if (summaryModal.style.display !== 'flex') return;
    
    // Handle keyboard navigation in modal
    if (e.key === 'Tab') {
        // Keep focus within modal
        const focusableElements = summaryModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Add CSS for stat cards and word chips in summary
const style = document.createElement('style');
style.textContent = `
    .stat-card {
        background: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
        margin: 10px 0;
        border: 1px solid #e9ecef;
    }
    
    .stat-card h4 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 5px;
    }
    
    .stat-card p {
        margin: 0;
        font-size: 0.9rem;
    }
    
    .word-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 0.9rem;
        white-space: nowrap;
        transition: transform 0.2s ease;
    }
    
    .word-chip:hover {
        transform: scale(1.05);
    }
    
    .word-chip-correct {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
    }
    
    .word-chip-incorrect {
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
    }
    
    .word-chip-icon {
        font-size: 1rem;
    }
`;
document.head.appendChild(style);
