// Enhanced joke extension with multiple categories
class JokeExtension {
    constructor() {
        this.currentCategory = 'dad';
        this.currentJoke = '';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadJoke(this.currentCategory);
    }

    bindEvents() {
        // Category tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchCategory(e.target.dataset.category);
            });
        });

        // Control buttons
        document.getElementById('newJokeBtn').addEventListener('click', () => {
            this.loadJoke(this.currentCategory);
        });

        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareJoke();
        });
    }

    switchCategory(category) {
        this.currentCategory = category;
        
        // Update active tab
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Load new joke
        this.loadJoke(category);
    }

    async loadJoke(category) {
        this.showLoading();
        
        try {
            const joke = await this.fetchJoke(category);
            this.displayJoke(joke);
        } catch (error) {
            this.displayError('Oops! Failed to fetch a joke. Try again later! 😅');
            console.error('Error fetching joke:', error);
        }
    }

    async fetchJoke(category) {
        switch (category) {
            case 'dad':
                return await this.fetchDadJoke();
            case 'pickup':
                return await this.fetchPickupLine();
            case 'puns':
                return await this.fetchPun();
            case 'programming':
                return await this.fetchProgrammingJoke();
            case 'oneliners':
                return await this.fetchOneLiner();
            default:
                return await this.fetchDadJoke();
        }
    }

    async fetchDadJoke() {
        // Since we can't access external APIs in this environment, 
        // I'll create a local collection of jokes for each category
        const dadJokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "I invented a new word: Plagiarism!",
            "Why don't eggs tell jokes? They'd crack each other up!",
            "I used to hate facial hair, but then it grew on me.",
            "What do you call a factory that makes good products? A satisfactory!",
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
            "Why did the scarecrow win an award? He was outstanding in his field!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised!",
            "What's the best thing about Switzerland? I don't know, but the flag is a big plus!",
            "I stayed up all night wondering where the sun went. Then it dawned on me!"
        ];
        
        return this.getRandomItem(dadJokes);
    }

    async fetchPickupLine() {
        const pickupLines = [
            "Are you a magician? Because whenever I look at you, everyone else disappears! ✨",
            "Do you have a map? I keep getting lost in your eyes! 🗺️",
            "Are you made of copper and tellurium? Because you're Cu-Te! 💫",
            "Is your name Google? Because you have everything I've been searching for! 🔍",
            "Are you a parking ticket? Because you've got 'FINE' written all over you! 🎫",
            "Do you have a Band-Aid? Because I just scraped my knee falling for you! 💕",
            "Are you a campfire? Because you're hot and I want s'more! 🔥",
            "If you were a vegetable, you'd be a cute-cumber! 🥒",
            "Are you WiFi? Because I'm feeling a connection! 📶",
            "Do you believe in love at first sight, or should I walk by again? 👀"
        ];
        
        return this.getRandomItem(pickupLines);
    }

    async fetchPun() {
        const puns = [
            "I wondered why the baseball kept getting bigger. Then it hit me! ⚾",
            "A bicycle can't stand on its own because it's two-tired! 🚲",
            "Time flies like an arrow. Fruit flies like a banana! 🍌",
            "I used to be a banker, but I lost interest! 💰",
            "The graveyard is so crowded, people are dying to get in! 🪦",
            "I'm reading a book about anti-gravity. It's impossible to put down! 📚",
            "When the window fell into the incinerator, it was a pane in the ash! 🪟",
            "A boiled egg in the morning is hard to beat! 🥚",
            "The math teacher called in sick with algebra! 📐",
            "Broken pencils are pointless! ✏️"
        ];
        
        return this.getRandomItem(puns);
    }

    async fetchProgrammingJoke() {
        const programmingJokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "There are only 10 types of people in the world: those who understand binary and those who don't! 💻",
            "Why do Java developers wear glasses? Because they can't C#! 👓",
            "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍻",
            "How many programmers does it take to change a light bulb? None. It's a hardware problem! 💡",
            "Why did the programmer quit his job? He didn't get arrays! 📊",
            "What's a programmer's favorite hangout place? Foo Bar! 🍺",
            "Why do programmers hate nature? It has too many bugs! 🌿",
            "What did the Java code say to the C code? You've got no class! ☕",
            "Why don't programmers like to go outside? The sunlight causes too many errors! ☀️"
        ];
        
        return this.getRandomItem(programmingJokes);
    }

    async fetchOneLiner() {
        const oneLiners = [
            "I told my wife she was drawing her eyebrows too high. She looked surprised! 😲",
            "My therapist says I have a preoccupation with vengeance. We'll see about that! 😏",
            "I haven't slept for ten days, because that would be too long! 😴",
            "I used to think I was indecisive, but now I'm not so sure! 🤔",
            "The early bird might get the worm, but the second mouse gets the cheese! 🐭",
            "I'm on a seafood diet. I see food and I eat it! 🐟",
            "Change is inevitable, except from a vending machine! 🪙",
            "The future, the present, and the past walked into a bar. Things got a little tense! ⏰",
            "I wondered why the baseball was getting bigger. Then it hit me! ⚾",
            "Did you hear about the claustrophobic astronaut? He just needed some space! 🚀"
        ];
        
        return this.getRandomItem(oneLiners);
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    showLoading() {
        document.getElementById('jokeElement').style.display = 'none';
        document.getElementById('loadingElement').style.display = 'flex';
    }

    displayJoke(joke) {
        this.currentJoke = joke;
        const jokeElement = document.getElementById('jokeElement');
        const loadingElement = document.getElementById('loadingElement');
        
        loadingElement.style.display = 'none';
        jokeElement.style.display = 'block';
        jokeElement.innerHTML = joke;
        jokeElement.classList.remove('error');
    }

    displayError(message) {
        const jokeElement = document.getElementById('jokeElement');
        const loadingElement = document.getElementById('loadingElement');
        
        loadingElement.style.display = 'none';
        jokeElement.style.display = 'block';
        jokeElement.innerHTML = message;
        jokeElement.classList.add('error');
    }

    shareJoke() {
        if (this.currentJoke) {
            // Use the Clipboard API if available
            if (navigator.clipboard) {
                navigator.clipboard.writeText(this.currentJoke).then(() => {
                    this.showShareFeedback();
                }).catch(() => {
                    this.fallbackShare();
                });
            } else {
                this.fallbackShare();
            }
        }
    }

    fallbackShare() {
        // Fallback method for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = this.currentJoke;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showShareFeedback();
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }

    showShareFeedback() {
        const shareBtn = document.getElementById('shareBtn');
        const originalText = shareBtn.innerHTML;
        
        shareBtn.innerHTML = '✓ Copied!';
        shareBtn.style.background = 'rgba(0, 255, 0, 0.3)';
        
        setTimeout(() => {
            shareBtn.innerHTML = originalText;
            shareBtn.style.background = '';
        }, 2000);
    }
}

// Initialize the extension when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JokeExtension();
});