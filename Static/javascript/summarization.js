document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('translateButton').addEventListener('click', function(event) {
        event.preventDefault();

        var inputText = document.getElementById('inputText').value.trim();

        if (!inputText) {
            alert('Please enter some text.');
            return;
        }

        // Hitting the API
        fetch('http://127.0.0.1:8000/summarization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            outputText2.value = data;


        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error processing your request. Please try again later.');
        });
    });
});

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
