class DictionaryApp {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.responseDiv = document.getElementById("response");

        // Search form
        this.searchForm = document.getElementById("search-form");
        this.searchInput = document.getElementById("search-word");
        this.searchForm.addEventListener("submit", (event) => this.handleSearch(event));

        // Store form
        this.storeForm = document.getElementById("store-form");
        this.wordInput = document.getElementById("word");
        this.definitionInput = document.getElementById("definition");
        this.storeForm.addEventListener("submit", (event) => this.handleSubmit(event));
    }

    async handleSearch(event) {
        event.preventDefault();
        const word = this.searchInput.value;

        try {
            const response = await fetch(`${this.apiUrl}?word=${word}`);
            const result = await response.json();
            this.displayResponse(result);
        } catch (error) {
            this.displayResponse({ message: searchFail });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const word = this.wordInput.value;
        const definition = this.definitionInput.value;

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ word, definition })
            });
            const result = await response.json();
            this.displayResponse(result);
        } catch (error) {
            this.displayResponse({ message: storeFail });
        }
    }

    displayResponse(result) {
        const { word, definition, message, requestCount } = result;
        this.responseDiv.innerText = message || `Request: ${requestCount}. ${word}: ${definition}`;
    }
}

class Main {
    constructor() {
        document.getElementById("title").innerText = title;
        document.getElementById("search-button").innerText = searchButton;
        document.getElementById("search-word").placeholder = searchWord;
        document.getElementById("store-button").innerText = storeButton;
        document.getElementById("word").placeholder = storeWord;
        document.getElementById("definition").placeholder = storeDefinition;
        new DictionaryApp("https://comp4537-lab4-server-3add.onrender.com/api/definitions/");
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new Main();
});